# Sales Dashboard

A full-stack Sales Dashboard application built with React + Vite + Tailwind CSS (frontend) and Node.js + Express (backend).

## Project Structure

```
demo/
├── backend/
│   ├── package.json
│   └── server.js          # Express API server
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx         # Dashboard UI with KPI cards
        └── index.css
```

## Running Locally

### 1. Start the Backend

```bash
cd backend
npm install
node server.js
# Runs on http://localhost:5000
```

### 2. Start the Frontend (dev mode)

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
# Proxies /api/* → http://localhost:5000
```

### 3. Build Frontend for Production

```bash
cd frontend
npm run build
```

## API

| Method | Endpoint        | Response                                     |
|--------|-----------------|----------------------------------------------|
| GET    | /api/dashboard  | `{ sales: 25000, orders: 180, customers: 75 }` |

## Features

- 3 KPI cards: Total Sales, Total Orders, Active Customers
- Loading spinner while fetching
- Error message on API failure
- Responsive grid layout (1 → 2 → 3 columns)
- Clean light UI with Tailwind CSS
