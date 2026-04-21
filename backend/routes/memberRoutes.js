const express = require('express');
const router = express.Router();
const memberController = require('../controller/memberController');
const authenticateUser = require('../middleware/middleware');
const authorizeRoles = require('../middleware/authorize');

router.post('/register',
    authenticateUser,
    authorizeRoles('chairman', 'secretary'),
    memberController.registerMember
);
router.get(
  '/',
  authenticateUser,
  authorizeRoles('chairman', 'secretary', 'treasurer'),
  memberController.getMembers
);

// Only chairman can update
router.put(
  '/:id',
  authenticateUser,
  authorizeRoles('chairman'),
  memberController.updateMember
);

// Only chairman can delete
router.delete(
  '/:id',
  authenticateUser,
  authorizeRoles('chairman'),
  memberController.deleteMember
);

module.exports = router;