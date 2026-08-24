'use strict';

const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------------------------------------------------------------
// In-memory store: Map<shortCode, { shortCode, originalUrl, createdAt, clickCount }>
// ---------------------------------------------------------------------------
const store = new Map();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateCode(len = 6) {
  let code = '';
  for (let i = 0; i < len; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return code;
}

function isValidUrl(str) {
  try {
    const u = new URL(str);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// POST /api/shorten
// ---------------------------------------------------------------------------
app.post('/api/shorten', (req, res) => {
  const { url, customAlias } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid or missing URL. Must be http/https.' });
  }

  let shortCode = customAlias ? String(customAlias).trim() : null;

  if (shortCode) {
    if (!/^[A-Za-z0-9_-]{1,32}$/.test(shortCode)) {
      return res.status(400).json({ error: 'Custom alias must be 1–32 alphanumeric/-/_ characters.' });
    }
    if (store.has(shortCode)) {
      return res.status(409).json({ error: `Alias "${shortCode}" is already taken.` });
    }
  } else {
    // Generate a unique 6-char code (retry on collision)
    let attempts = 0;
    do {
      shortCode = generateCode();
      attempts++;
    } while (store.has(shortCode) && attempts < 10);
  }

  const entry = {
    shortCode,
    originalUrl: url,
    createdAt: new Date().toISOString(),
    clickCount: 0,
  };

  store.set(shortCode, entry);
  return res.status(201).json(entry);
});

// ---------------------------------------------------------------------------
// GET /api/links — all links sorted by clickCount desc
// ---------------------------------------------------------------------------
app.get('/api/links', (req, res) => {
  const links = Array.from(store.values()).sort((a, b) => b.clickCount - a.clickCount);
  return res.json(links);
});

// ---------------------------------------------------------------------------
// DELETE /api/links/:shortCode
// ---------------------------------------------------------------------------
app.delete('/api/links/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  if (!store.has(shortCode)) {
    return res.status(404).json({ error: 'Short code not found.' });
  }
  store.delete(shortCode);
  return res.status(200).json({ message: 'Deleted.' });
});

// ---------------------------------------------------------------------------
// GET /:shortCode — redirect
// (must come AFTER API routes to avoid conflicts)
// ---------------------------------------------------------------------------
app.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  const entry = store.get(shortCode);
  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found.' });
  }
  entry.clickCount += 1;
  return res.redirect(302, entry.originalUrl);
});

// ---------------------------------------------------------------------------
// Expose store reset for tests
// ---------------------------------------------------------------------------
app._store = store;

module.exports = app;
