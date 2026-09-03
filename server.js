const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API: Stats
app.get('/api/stats', (req, res) => {
  res.json({
    totalUsers: 12480,
    revenue: 84320,
    orders: 3210,
    growth: 14.5
  });
});

// API: Recent orders
app.get('/api/orders', (req, res) => {
  res.json([
    { id: '#1042', customer: 'Alice Martin',   product: 'Pro Plan',   amount: 120, status: 'Completed' },
    { id: '#1041', customer: 'Bob Chen',        product: 'Starter',    amount: 49,  status: 'Pending'   },
    { id: '#1040', customer: 'Carol White',     product: 'Enterprise', amount: 499, status: 'Completed' },
    { id: '#1039', customer: 'David Kim',       product: 'Pro Plan',   amount: 120, status: 'Cancelled' },
    { id: '#1038', customer: 'Eva Rossi',       product: 'Starter',    amount: 49,  status: 'Completed' },
    { id: '#1037', customer: 'Frank Lopez',     product: 'Pro Plan',   amount: 120, status: 'Pending'   },
  ]);
});

// API: Monthly revenue chart data
app.get('/api/chart', (req, res) => {
  res.json({
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    data:   [4200, 5800, 5100, 7200, 6800, 9100, 8400, 9900, 10200, 11000, 9800, 12300]
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Dashboard server running on port 3000');
});
