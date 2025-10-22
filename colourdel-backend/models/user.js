const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  active: { type: Boolean, default: true },
});

const badgeSchema = new mongoose.Schema({
  badgeId: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  awardedAt: { type: Date, default: Date.now },
});

const reportSchema = new mongoose.Schema({
  type: { type: String, required: true },
  data: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, default: '' },
  phone: { type: String, default: '' },
  otp: {
    code: String,
    expiresAt: Date,
  },
  refreshTokens: [String],
  streaks: [streakSchema],
  currentStreakCount: { type: Number, default: 0 },
  lastStreakDate: Date,
  badges: [badgeSchema],
  reports: [reportSchema],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);