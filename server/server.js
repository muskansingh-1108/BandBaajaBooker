const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ FAKE DATABASE (In-memory - Works immediately!)
let users = [];
let events = [];

// REGISTER (Fake DB)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), name, email, password: hashedPassword };
    users.push(user);
    
    const token = jwt.sign({ id: user.id }, 'bandbaajasecret');
    res.json({ success: true, token, user: { id: user.id, name, email } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id }, 'bandbaajasecret');
    res.json({ success: true, token, user: { id: user.id, name: user.name, email } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET EVENTS
app.get('/api/events', (req, res) => {
  res.json({ success: true, events });
});

// CREATE EVENT
app.post('/api/events', (req, res) => {
  try {
    const event = { id: Date.now().toString(), ...req.body };
    events.push(event);
    res.json({ success: true, event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.listen(5000, () => {
  console.log('🚀 Backend running on http://localhost:5000');
  console.log('✅ Login/Register/Events ALL WORKING!');
  console.log('💡 Test: curl http://localhost:5000/api/events');
});