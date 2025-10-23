const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// login
router.post('/login', async (req,res)=>{
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ error: 'email and password required' });
    const admin = await Admin.findOne({ email });
    if(!admin) return res.status(401).json({error:'Invalid credentials'});
    const ok = await admin.verifyPassword(password);
    if(!ok) return res.status(401).json({error:'Invalid credentials'});
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email }});
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
