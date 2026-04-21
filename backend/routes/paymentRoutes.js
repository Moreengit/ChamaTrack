const express = require('express');
const router = express.Router();

const paymentsController = require('../controller/paymentController');
const authenticateToken = require('../middleware/middleware');
const authorizeRoles = require('../middleware/authorize');

// STK PUSH
router.post(
  '/stk',
  authenticateToken,
  authorizeRoles('member'),
  paymentsController.stkPush
);

// CALLBACK (NO AUTH!)
router.post('/callback', paymentsController.callback);

// GET MY PAYMENTS
router.get(
  '/my-contributions',
  authenticateToken,
  authorizeRoles('member'),
  paymentsController.getPayments
);

router.get(
  '/summary',
  authenticateToken,
  authorizeRoles('member'),
  paymentsController.getSummary
);

router.get(
 '/my-receipts',
  authenticateToken,
  authorizeRoles('member'),
  paymentsController.getMyReceipts
);

router.get(
  '/contributions',
  authenticateToken,
  authorizeRoles('treasurer'),
  paymentsController.getContributions
);

router.get(
  '/contributions/total',
  authenticateToken,
  authorizeRoles('treasurer'),
  paymentsController.getTotalContributions
);

router.get(
  '/financial',
  authenticateToken,
  authorizeRoles('treasurer'),
  paymentsController.getFinancialReport
);

module.exports = router;

