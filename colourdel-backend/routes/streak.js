const express = require('express');
const router = express.Router();
const streakController = require('../controllers/streakController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, streakController.getStreak);
router.post('/update', authMiddleware, streakController.updateStreak);
router.post('/reset', authMiddleware, streakController.resetStreak);

module.exports = router;