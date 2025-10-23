const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const { requireAuth } = require('../middleware/auth');
const { sendNotification } = require('../utils/notifications');

// GET /api/sessions?from=...&to=...&topic=...
router.get('/', async (req,res) => {
  try {
    const { from, to, topic } = req.query;
    const filter = { isPublic: true };
    if(topic) filter.topic = topic;
    if(from || to) filter.date = {};
    if(from) filter.date.$gte = new Date(from);
    if(to) filter.date.$lte = new Date(to);
    const sessions = await Session.find(filter).sort({ date: 1 });
    res.json(sessions);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/sessions/:id
router.get('/:id', async (req,res) => {
  try {
    const s = await Session.findById(req.params.id);
    if(!s) return res.status(404).json({error:'Not found'});
    res.json(s);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin-only create
router.post('/', requireAuth, async (req,res) => {
  try {
    const body = req.body;
    const s = new Session({ ...body, createdBy: req.admin.id });
    await s.save();
    res.status(201).json(s);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', requireAuth, async (req,res) => {
  try {
    const s = await Session.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
    if(!s) return res.status(404).json({error:'Not found'});
    res.json(s);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', requireAuth, async (req,res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Send notification email(s)
router.post('/:id/notify', requireAuth, async (req,res) => {
  try {
    const session = await Session.findById(req.params.id);
    if(!session) return res.status(404).json({error:'Not found'});
    const { emails = [], message } = req.body;
    const info = await sendNotification({ session, emails, message });
    res.json({ sent: true, info });
  } catch(err) {
    console.error(err);
    res.status(500).json({error: 'Failed to send notifications', detail: err.message});
  }
});

module.exports = router;
