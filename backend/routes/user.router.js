// routes/chamaRoutes.js
const express = require('express');
const router = express.Router();
const chamaController = require('../controller/user.controller');
const authenticateToken = require('../middleware/middleware');

// POST  /chama/register
router.post('/registerchama', chamaController.registerChama);
router.post('/login', chamaController.loginChairman);
router.get('/chairman', authenticateToken, chamaController.getChairman)

module.exports = router;