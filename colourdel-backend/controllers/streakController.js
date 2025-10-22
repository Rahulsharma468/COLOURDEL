const User = require('../models/User');

const getUTCDateOnly = (date) => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

exports.getStreak = async (req, res) => {
  try {
    const user = req.user;
    const streakHistory = user.streaks.map(s => ({
      date: s.date,
      active: s.active,
    }));
    return res.json({
      currentStreakCount: user.currentStreakCount,
      streakHistory,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateStreak = async (req, res) => {
  try {
    const user = req.user;
    const today = getUTCDateOnly(new Date());

    let lastStreakDate = user.lastStreakDate ? getUTCDateOnly(new Date(user.lastStreakDate)) : null;

    if (lastStreakDate) {
      const diffDays = (today - lastStreakDate) / (1000 * 60 * 60 * 24);
      if (diffDays === 0) {
        return res.status(400).json({ message: 'Streak already updated for today' });
      } else if (diffDays === 1) {
        user.currentStreakCount += 1;
      } else {
        user.currentStreakCount = 1;
      }
    } else {
      user.currentStreakCount = 1;
    }

    if (user.currentStreakCount > 7) user.currentStreakCount = 7;

    user.streaks.push({
      date: today,
      active: true,
    });
    user.lastStreakDate = today;

    await user.save();

    return res.json({ currentStreakCount: user.currentStreakCount });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.resetStreak = async (req, res) => {
  try {
    const user = req.user;
    user.currentStreakCount = 0;
    user.lastStreakDate = null;
    user.streaks.push({
      date: new Date(),
      active: false,
    });
    await user.save();
    return res.json({ message: 'Streak reset' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};