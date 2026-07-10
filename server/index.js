// ─── Dependencies ───
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// ─── Config ───
const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant-db';
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

// ─── Middleware ───
app.use(cors({
  origin: clientUrl,
  credentials: true
}));
app.use(express.json());

// ─── MongoDB Connection ───
const client = new MongoClient(mongoUri);
let db = null;

async function connectDB() {
  try {
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB database successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB database:', error.message);
    // Do not crash the process; retry on request or let health check fail
  }
}

// ─── Collections ───
// References will be dynamically read from `db` once connected:
const getMenuCollection = () => db ? db.collection('menus') : null;
const getTableCollection = () => db ? db.collection('tables') : null;
const getOrderCollection = () => db ? db.collection('orders') : null;
const getReservationCollection = () => db ? db.collection('reservations') : null;
const getStaffCollection = () => db ? db.collection('staff') : null;

// ─── Routes ───
// Base API Check
app.get('/', (req, res) => {
  res.send('Restaurant server is running...');
});

// T-002: MongoDB connection + health API
app.get('/api/health', (req, res) => {
  if (db) {
    return res.status(200).json({
      success: true,
      status: 'ok',
      db: 'connected'
    });
  } else {
    return res.status(503).json({
      success: false,
      status: 'error',
      db: 'disconnected',
      message: 'Database connection not initialized'
    });
  }
});

// ─── Start Server ───
async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running and listening on port ${port}`);
  });
}

startServer().catch(console.dir);
