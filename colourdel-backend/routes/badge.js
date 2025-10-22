const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/predefined', badgeController.getPredefinedBadges);
router.get('/', authMiddleware, badgeController.getUserBadges);
router.post('/award', authMiddleware, badgeController.awardBadge);

module.exports = router;