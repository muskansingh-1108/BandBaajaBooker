const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// 🔥 FIXED CORS for port 5173 (Vite)
app.use(cors({
  origin: [
    'https://humble-bassoon-wr565rwxxxjp2g44q-5173.app.github.dev',
    'http://localhost:5173',
    'http://localhost:5000',
    'https://band-baaja-booker.vercel.app',

  ],  
  credentials: true
}));

app.use(express.json());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend: http://localhost:${PORT}`);
  console.log(`✅ Frontend: http://localhost:5173`);
  console.log('🔗 CORS Fixed for 5173!');
});