const User = require('../models/User');

const predefinedBadges = [
  { badgeId: 'streak_7', name: '7 Day Streak', description: 'Completed a 7-day streak' },
  { badgeId: 'profile_complete', name: 'Profile Complete', description: 'Completed your user profile' },
  { badgeId: 'first_login', name: 'First Login', description: 'Logged in for the first time' },
];

exports.getPredefinedBadges = (req, res) => {
  res.json(predefinedBadges);
};

exports.getUserBadges = async (req, res) => {
  const user = req.user;
  return res.json(user.badges);
};

exports.awardBadge = async (req, res) => {
  try {
    const { badgeId } = req.body;
    if (!badgeId) return res.status(400).json({ message: 'badgeId is required' });

    const user = req.user;
    const badgeInfo = predefinedBadges.find(b => b.badgeId === badgeId);
    if (!badgeInfo) return res.status(400).json({ message: 'Invalid badgeId' });

    if (user.badges.some(b => b.badgeId === badgeId)) {
      return res.status(400).json({ message: 'Badge already awarded' });
    }

    user.badges.push({
      badgeId: badgeInfo.badgeId,
      name: badgeInfo.name,
      description: badgeInfo.description,
      awardedAt: new Date(),
    });

    await user.save();
    return res.json({ message: 'Badge awarded successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};