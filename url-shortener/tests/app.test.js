'use strict';

const request = require('supertest');
const app     = require('../app');

// Reset the in-memory store before every test so tests are isolated
beforeEach(() => {
  app._store.clear();
});

// ---------------------------------------------------------------------------
// POST /api/shorten
// ---------------------------------------------------------------------------
describe('POST /api/shorten', () => {
  test('201 — creates a short link with auto-generated code', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ url: 'https://example.com' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      originalUrl: 'https://example.com',
      clickCount: 0,
    });
    expect(res.body.shortCode).toHaveLength(6);
    expect(res.body.createdAt).toBeDefined();
  });

  test('201 — creates a short link with a custom alias', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ url: 'https://example.com/page', customAlias: 'mypage' });

    expect(res.status).toBe(201);
    expect(res.body.shortCode).toBe('mypage');
    expect(res.body.originalUrl).toBe('https://example.com/page');
  });

  test('409 — returns conflict when custom alias is already taken', async () => {
    await request(app)
      .post('/api/shorten')
      .send({ url: 'https://first.com', customAlias: 'taken' });

    const res = await request(app)
      .post('/api/shorten')
      .send({ url: 'https://second.com', customAlias: 'taken' });

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/taken/i);
  });

  test('400 — rejects missing URL', async () => {
    const res = await request(app).post('/api/shorten').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('400 — rejects non-http/https URL', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ url: 'ftp://example.com' });
    expect(res.status).toBe(400);
  });

  test('400 — rejects completely invalid URL string', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ url: 'not-a-url-at-all' });
    expect(res.status).toBe(400);
  });

  test('400 — rejects custom alias with invalid characters', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ url: 'https://example.com', customAlias: 'bad alias!' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('stored entry appears in the store', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ url: 'https://stored.com', customAlias: 'store-test' });

    expect(res.status).toBe(201);
    expect(app._store.has('store-test')).toBe(true);
    expect(app._store.get('store-test').originalUrl).toBe('https://stored.com');
  });
});

// ---------------------------------------------------------------------------
// GET /:shortCode  (redirect)
// ---------------------------------------------------------------------------
describe('GET /:shortCode', () => {
  test('302 — redirects to original URL and increments clickCount', async () => {
    await request(app)
      .post('/api/shorten')
      .send({ url: 'https://redirect-target.com', customAlias: 'redir' });

    const res = await request(app).get('/redir').redirects(0);

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('https://redirect-target.com');
    expect(app._store.get('redir').clickCount).toBe(1);
  });

  test('clickCount increments on every visit', async () => {
    await request(app)
      .post('/api/shorten')
      .send({ url: 'https://click-test.com', customAlias: 'clk' });

    await request(app).get('/clk').redirects(0);
    await request(app).get('/clk').redirects(0);
    await request(app).get('/clk').redirects(0);

    expect(app._store.get('clk').clickCount).toBe(3);
  });

  test('404 — unknown short code', async () => {
    const res = await request(app).get('/doesnotexist');
    expect(res.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// GET /api/links
// ---------------------------------------------------------------------------
describe('GET /api/links', () => {
  test('returns empty array when no links exist', async () => {
    const res = await request(app).get('/api/links');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('returns all created links', async () => {
    await request(app).post('/api/shorten').send({ url: 'https://a.com', customAlias: 'aaa' });
    await request(app).post('/api/shorten').send({ url: 'https://b.com', customAlias: 'bbb' });

    const res = await request(app).get('/api/links');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  test('sorts by clickCount descending', async () => {
    await request(app).post('/api/shorten').send({ url: 'https://low.com',  customAlias: 'low' });
    await request(app).post('/api/shorten').send({ url: 'https://high.com', customAlias: 'high' });
    await request(app).post('/api/shorten').send({ url: 'https://mid.com',  customAlias: 'mid' });

    // give 'high' 3 clicks, 'mid' 1 click, 'low' 0 clicks
    await request(app).get('/high').redirects(0);
    await request(app).get('/high').redirects(0);
    await request(app).get('/high').redirects(0);
    await request(app).get('/mid').redirects(0);

    const res = await request(app).get('/api/links');
    expect(res.status).toBe(200);
    const codes = res.body.map(l => l.shortCode);
    expect(codes[0]).toBe('high');
    expect(codes[1]).toBe('mid');
    expect(codes[2]).toBe('low');
  });

  test('each link contains required fields', async () => {
    await request(app).post('/api/shorten').send({ url: 'https://fields.com', customAlias: 'fld' });

    const res  = await request(app).get('/api/links');
    const link = res.body[0];

    expect(link).toHaveProperty('shortCode');
    expect(link).toHaveProperty('originalUrl');
    expect(link).toHaveProperty('createdAt');
    expect(link).toHaveProperty('clickCount');
  });
});

// ---------------------------------------------------------------------------
// DELETE /api/links/:shortCode
// ---------------------------------------------------------------------------
describe('DELETE /api/links/:shortCode', () => {
  test('200 — deletes an existing link', async () => {
    await request(app).post('/api/shorten').send({ url: 'https://todelete.com', customAlias: 'del' });

    const res = await request(app).delete('/api/links/del');
    expect(res.status).toBe(200);
    expect(app._store.has('del')).toBe(false);
  });

  test('deleted link no longer appears in /api/links', async () => {
    await request(app).post('/api/shorten').send({ url: 'https://gone.com', customAlias: 'gone' });
    await request(app).delete('/api/links/gone');

    const res = await request(app).get('/api/links');
    expect(res.body.find(l => l.shortCode === 'gone')).toBeUndefined();
  });

  test('deleted short code returns 404 on redirect', async () => {
    await request(app).post('/api/shorten').send({ url: 'https://rmdirect.com', customAlias: 'rmd' });
    await request(app).delete('/api/links/rmd');

    const res = await request(app).get('/rmd').redirects(0);
    expect(res.status).toBe(404);
  });

  test('404 — deleting non-existent code', async () => {
    const res = await request(app).delete('/api/links/nope');
    expect(res.status).toBe(404);
  });
});
