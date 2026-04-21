const express = require('express');
const router = express.Router();

const minutesController = require('../controller/minutesController');
const authenticateToken = require('../middleware/middleware');
const authorizeRoles = require('../middleware/authorize');

const upload = require('../middleware/upload'); // multer

// UPLOAD
router.post(
  '/upload',
  authenticateToken,
  authorizeRoles('chairman', 'secretary'),
  upload.single('file'),
  minutesController.uploadMinutes
);

// GET
router.get(
  '/',
  authenticateToken,
  authorizeRoles('chairman', 'secretary', 'treasurer'),
  minutesController.getMinutes
);

// DELETE
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('chairman'),
  minutesController.deleteMinutes
);

module.exports = router;