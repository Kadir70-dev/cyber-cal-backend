require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const sessionRoutes = require('./routes/sessions');
const authRoutes = require('./routes/auth');

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cybercal';
mongoose.connect(mongoUri, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=> console.log('Mongo connected'))
  .catch(err => { console.error(err); process.exit(1); });

app.use('/api/sessions', sessionRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req,res) => res.json({ ok: true, service: 'cyber-cal-backend' }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend running on ${port}`));
