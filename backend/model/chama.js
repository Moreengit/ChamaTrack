const pool = require('../config/db');
const bcrypt = require('bcryptjs');
// Generate CH ID
const generateChairmanId = async () => {

  const query = `
    SELECT id
    FROM chairmen
    ORDER BY created_at DESC
    LIMIT 1
  `;

  const result = await pool.query(query);

  let nextNumber = 1;

  if (result.rows.length > 0) {
    const lastId = result.rows[0].id; // CH101
    const numberPart = parseInt(lastId.replace('CH', ''));
    nextNumber = numberPart + 1;
  }

  return `CH${nextNumber}`;
};


const createChairman = async (data) => {

  const { chairmanName, email, phonenumber, password } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const chairman_code = await generateChairmanId();

  const query = `
    INSERT INTO chairmen
    (chairman_code, chairman_name, email, phone_number, password)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING id
  `;

  const values = [chairman_code, chairmanName, email, phonenumber, hashedPassword];

  const result = await pool.query(query, values);

  return result.rows[0];
};


const createChama = async (data, chairmanId) => {

  const { chamaName, frequency, description } = data;

  const query = `
    INSERT INTO chamas
    (chama_name, frequency, description, created_by)
    VALUES ($1,$2,$3,$4)
    RETURNING *
  `;

  const values = [chamaName, frequency, description, chairmanId];

  const result = await pool.query(query, values);

  return result.rows[0];
};
const findChairmanByLogin = async (identifier) => {
  const query = `
    SELECT * FROM chairmen
    WHERE email = $1 OR phone_number = $1 OR chairman_code = $1
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [identifier]);
  return rows[0] || null;
};

const comparePassword = async (candidatePassword, hash) => {
  return bcrypt.compare(candidatePassword, hash);
};

module.exports = {
  createChairman,
  createChama,
  findChairmanByLogin,
  comparePassword
};