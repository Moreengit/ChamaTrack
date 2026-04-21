const pool = require('../config/db');

// CREATE MINUTES
const createMinutes = async (data) => {
  const {
    chama_id,
    title,
    meeting_date,
    description,
    file_name,
    file_url,
    uploaded_by
  } = data;

  const query = `
    INSERT INTO minutes 
    (chama_id, title, meeting_date, description, file_name, file_url, uploaded_by)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
  `;

  const values = [
    chama_id,
    title,
    meeting_date,
    description,
    file_name,
    file_url,
    uploaded_by
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// GET ALL MINUTES BY CHAMA
const getMinutesByChama = async (chama_id) => {
  const result = await pool.query(
    `SELECT * FROM minutes WHERE chama_id = $1 ORDER BY created_at DESC`,
    [chama_id]
  );

  return result.rows;
};

// DELETE
const deleteMinutes = async (id) => {
  await pool.query(`DELETE FROM minutes WHERE id = $1`, [id]);
};

module.exports = {
  createMinutes,
  getMinutesByChama,
  deleteMinutes
};