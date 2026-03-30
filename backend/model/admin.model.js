const pool = require('../config/db');

const create = async (data) => {
  const sql = `
    INSERT INTO admins (chama_id, name, email, password, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    data.chama_id,
    data.name,
    data.email,
    data.password,
    data.role
  ];

  const result = await pool.query(sql, values);
  return result.rows[0];
};

const findByChama = async (chama_id) => {
  const sql = `
    SELECT id, name, email, role
    FROM admins
    WHERE chama_id = $1
  `;

  const result = await pool.query(sql, [chama_id]);
  return result.rows;
};

module.exports = {
  create,
  findByChama
};
