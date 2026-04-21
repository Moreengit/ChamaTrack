const axios = require('axios');
const paymentsModel = require('../model/payment');
require('dotenv').config();

// 🔐 ENV VARIABLES
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const SHORTCODE = process.env.MPESA_SHORTCODE;
const PASSKEY = process.env.MPESA_PASSKEY;
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;

const BASE_URL = "https://sandbox.safaricom.co.ke";

// 🔥 GET ACCESS TOKEN
const getAccessToken = async () => {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

  const response = await axios.get(
    `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: {
        Authorization: `Basic ${auth}`
      }
    }
  );

  return response.data.access_token;
};

// 🔥 GENERATE PASSWORD
const generatePassword = () => {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, '')
    .slice(0, 14);

  const password = Buffer.from(
    SHORTCODE + PASSKEY + timestamp
  ).toString('base64');

  return { password, timestamp };
};

// 🔥 FORMAT PHONE
const formatPhone = (phone) => {
  if (phone.startsWith('0')) {
    return '254' + phone.substring(1);
  }
  if (phone.startsWith('+254')) {
    return phone.replace('+', '');
  }
  return phone;
};

// 🚀 STK PUSH
const initiateSTK = async (data, user) => {
  const { amount, phoneNumber } = data;

  const member_id = user.id; 
  const chama_id = user.chama_id; 

  if (!member_id || !chama_id) {
    throw new Error("User session is missing Member ID or Chama ID");
  }

  console.log("STEP 1: Getting token...");
  const token = await getAccessToken();
  console.log("STEP 2: Generating password...");

  const { password, timestamp } = generatePassword();

  const formattedPhone = formatPhone(phoneNumber);

  console.log("STEP 3: Sending STK request...");

  const payload = {
    BusinessShortCode: SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Number(amount),
    PartyA: formattedPhone,
    PartyB: SHORTCODE,
    PhoneNumber: formattedPhone,
    CallBackURL: CALLBACK_URL,
    AccountReference: "ChamaTrack",
    TransactionDesc: "Chama Contribution"
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("DARARAJA RESPONSE:", response.data);

    // ❗ CHECK RESPONSE SUCCESS
    if (response.data.ResponseCode !== "0") {
      throw new Error(response.data.errorMessage || "STK Push failed");
    }

    const CheckoutRequestID = response.data.CheckoutRequestID;

    // save payment
    const payment = await paymentsModel.createPayment({
      member_id: parseInt(user.id),
      chama_id: user.chama_id,
      amount,
      phone_number: formattedPhone,
      checkout_request_id: CheckoutRequestID
    });

    return payment;

  } catch (err) {
    if (err.response) {
    console.log("--- SAFARICOM ERROR DETAILS ---");
    console.log("Status:", err.response.status);
    console.log("Data:", JSON.stringify(err.response.data, null, 2));
  } else {
    console.log("Error Message:", err.message);
  }
  throw new Error(err.response?.data?.errorMessage || "STK Push failed");
}
};

// 🔥 CALLBACK HANDLER
const handleCallback = async (body) => {
  try {
    const stk = body.Body.stkCallback;

    const checkoutId = stk.CheckoutRequestID;
    const resultCode = stk.ResultCode;

    let receipt = null;

    if (resultCode === 0) {
      const metadata = stk.CallbackMetadata.Item;

      const receiptItem = metadata.find(
        item => item.Name === "MpesaReceiptNumber"
      );

      receipt = receiptItem?.Value;
    }

    const status = resultCode === 0 ? 'success' : 'failed';

    return await paymentsModel.updatePaymentStatus(
      checkoutId,
      status,
      receipt
    );

  } catch (error) {
    console.error("Callback error:", error);
  }
};

// GET PAYMENTS
const getMyPayments = async (user) => {
  return await paymentsModel.getMemberPayments(user.id);
};

const getSummary = async (user) => {
  return await paymentsModel.getContributionSummary(user.id);
};
const getReceipt = async (paymentId, memberId) => {
  return await paymentsModel.getMyReceipts(paymentId, memberId);
};

const getContributions = async (chamaId) => {
  return await paymentsModel.getContributions(chamaId);
};

const getTotalContributions = async (chamaId) => {
  return await paymentsModel.getTotalContributions(chamaId);
};

const getFinancialReport = async (chamaId) => {
  const totalData = await paymentsModel.getTotalContributions(chamaId);
  const transactions = await paymentsModel.getFinancialTransactions(chamaId);

  const totalContributions = Number(totalData.total || 0);

  // simple balance logic (expand later if you add expenses)
  const balance = totalContributions;

  return {
    totalContributions,
    balance,
    transactions
  };
};

module.exports = {
  initiateSTK,
  handleCallback,
  getMyPayments,
  getSummary,
  getReceipt,
  getContributions,
  getTotalContributions,
  getFinancialReport
};