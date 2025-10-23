// Simple script to create an admin user. Run: node create-admin.js
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cybercal';
mongoose.connect(mongoUri, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(async ()=> {
    const email = process.env.ADMIN_EMAIL || 'admin@sohailacademy.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const name = process.env.ADMIN_NAME || 'Sohail Sir';

    const exists = await Admin.findOne({ email });
    if(exists) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }

    const a = new Admin({ name, email });
    await a.setPassword(password);
    await a.save();
    console.log('Admin created:', email);
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
