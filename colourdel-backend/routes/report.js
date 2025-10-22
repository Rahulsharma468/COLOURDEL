const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, reportController.getReports);
router.post('/', authMiddleware, reportController.addReport);

module.exports = router;