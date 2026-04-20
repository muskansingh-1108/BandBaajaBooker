const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// 🔥 FIXED CORS for port 5173 (Vite)
app.use(cors({
  origin: 'http://localhost:5173',  // Vite default port
  credentials: true
}));

app.use(express.json());

// ... baki code same hai jo maine diya tha

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend: http://localhost:${PORT}`);
  console.log(`✅ Frontend: http://localhost:5173`);
  console.log('🔗 CORS Fixed for 5173!');
});