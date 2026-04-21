const paymentsService = require('../service/paymentService');

// STK PUSH
const stkPush = async (req, res) => {
  console.log("Logged in user:", req.user);
  console.log("payload:", req.body);
  try {
    const result = await paymentsService.initiateSTK(req.body, req.user);

    res.status(200).json({
      message: 'STK Push sent successfully',
      result
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CALLBACK (Safaricom hits this)
const callback = async (req, res) => {
  try {
    console.log("CALLBACK:", JSON.stringify(req.body, null, 2));

    await paymentsService.handleCallback(req.body);

    res.json({ message: "Received" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MEMBER PAYMENTS
const getPayments = async (req, res) => {
  try {
    const payments = await paymentsService.getMyPayments(req.user);

    res.json(payments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSummary = async (req, res) => {
  try {
    const summary = await paymentsService.getSummary(req.user);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyReceipts = async (req, res) => {
  try {
    const memberId = req.user.id;

    const receipts = await paymentsService.getReceipt(memberId);

    res.json(receipts);

  } catch (error) {
    console.error("GET MY RECEIPTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const getContributions = async (req, res) => {
  try {
    const chamaId = req.user.chama_id;

    const data = await paymentsService.getContributions(chamaId);

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const getTotalContributions = async (req, res) => {
  try {
    const chamaId = req.user.chama_id;

    const data = await paymentsService.getTotalContributions(chamaId);

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFinancialReport = async (req, res) => {
  try {
    const chamaId = req.user.chama_id;

    const report = await paymentsService.getFinancialReport(chamaId);

    res.json(report);

  } catch (error) {
    console.error("FINANCIAL REPORT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  stkPush,
  callback,
  getPayments,
  getSummary,
  getMyReceipts,
  getContributions,
  getTotalContributions,
  getFinancialReport
};