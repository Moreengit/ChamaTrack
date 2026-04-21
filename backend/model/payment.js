const pool = require('../config/db');

// CREATE PAYMENT
const createPayment = async (payment) => {
  const {
    member_id,
    chama_id,
    amount,
    phone_number,
    checkout_request_id
  } = payment;

  const query = `
    INSERT INTO payments 
    (member_id, chama_id, amount, phone_number, checkout_request_id)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
  `;

  const values = [
    member_id,
    chama_id,
    amount,
    phone_number,
    checkout_request_id
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// UPDATE STATUS (callback)
const updatePaymentStatus = async (checkout_request_id, status, transaction_id) => {
  const query = `
    UPDATE payments
    SET status=$1, transaction_id=$2
    WHERE checkout_request_id=$3
    RETURNING *;
  `;

  const values = [status, transaction_id, checkout_request_id];
  const result = await pool.query(query, values);

  return result.rows[0];
};

// GET MEMBER PAYMENTS
const getMemberPayments = async (member_id) => {
  const result = await pool.query(
    `SELECT * FROM payments WHERE member_id=$1 ORDER BY created_at DESC`,
    [member_id]
  );
  return result.rows;
};

const getContributionSummary = async (member_id) => {
  const query = `
    SELECT 
      COUNT(*) FILTER (WHERE status = 'success') AS successful_count,
      COUNT(*) FILTER (WHERE status = 'pending') AS pending_count,
      COUNT(*) FILTER (WHERE status = 'failed') AS failed_count,

      COALESCE(SUM(amount) FILTER (WHERE status = 'success'), 0) AS total_paid,
      COALESCE(SUM(amount) FILTER (WHERE status = 'pending'), 0) AS total_pending

    FROM payments
    WHERE member_id = $1
  `;

  const result = await pool.query(query, [member_id]);
  return result.rows[0];
};

const getMyReceipts = async (memberId) => {
  const query = `
    SELECT 
      p.id,
      p.amount,
      p.status,
      p.transaction_id,
      p.phone_number,
      p.created_at,
      m.name AS member_name,
      c.chama_name AS chama_name
    FROM payments p
    JOIN members m ON p.member_id = m.id
    JOIN chamas c ON p.chama_id = c.id
    WHERE p.member_id = $1
   -- AND p.status = 'success'   -- ✅ ONLY SUCCESSFUL PAYMENTS
    ORDER BY p.created_at DESC
  `;

  const result = await pool.query(query, [memberId]);
  return result.rows;
};

const getContributions = async (chamaId) => {
  const query = `
    SELECT 
      p.id,
      p.amount,
      p.status,
      p.created_at,
      m.name AS member_name,
      m.email,
      m.phonenumber
    FROM payments p
    JOIN members m ON p.member_id = m.id
    WHERE p.chama_id = $1
    ORDER BY p.created_at DESC
  `;

  const result = await pool.query(query, [chamaId]);
  return result.rows;
};

const getTotalContributions = async (chamaId) => {
  const query = `
    SELECT COALESCE(SUM(amount), 0) AS total
    FROM payments
    WHERE chama_id = $1
    AND status = 'success'
  `;

  const result = await pool.query(query, [chamaId]);
  return result.rows[0];
};

const getFinancialTransactions = async (chamaId) => {
  const query = `
    SELECT 
      p.id,
      p.amount,
      p.status,
      p.created_at,
      m.name AS member_name
    FROM payments p
    JOIN members m ON p.member_id = m.id
    WHERE p.chama_id = $1
    AND p.status = 'success'
    ORDER BY p.created_at DESC;
  `;

  const result = await pool.query(query, [chamaId]);
  return result.rows;
};

module.exports = {
  createPayment,
  updatePaymentStatus,
  getMemberPayments,
  getContributionSummary,
  getMyReceipts,
  getContributions,
  getTotalContributions,
  getFinancialTransactions 
};