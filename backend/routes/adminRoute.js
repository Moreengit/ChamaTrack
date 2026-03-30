const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/middleware');
const authorizeRoles = require('../middleware/authorize');
const adminController = require('../controller/adminAuth');

router.post(
  '/register',
  authenticateToken,
  authorizeRoles('chairman'),
  adminController.registerAdmin
);
router.get(
  '/display',
  authenticateToken,
  authorizeRoles('chairman'),
  adminController.getAdmins
)

module.exports = router;