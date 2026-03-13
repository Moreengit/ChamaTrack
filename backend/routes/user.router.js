// routes/chamaRoutes.js
const express = require('express');
const router = express.Router();
const chamaController = require('../controller/user.controller');

// POST  /chama/register
router.post('/registerchama', chamaController.registerChama);
router.post('/login', chamaController.loginChairman);

module.exports = router;