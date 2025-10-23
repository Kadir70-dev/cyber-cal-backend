const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  topic: { type: String, enum: ['SOC','GRC','Threat Intel'], required: true },
  date: { type: Date, required: true },
  durationMinutes: { type: Number, default: 60 },
  meetingLink: { type: String },
  trainer: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

SessionSchema.index({ date: 1 });

module.exports = mongoose.model('Session', SessionSchema);
