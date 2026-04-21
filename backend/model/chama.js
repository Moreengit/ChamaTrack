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
    nextNumber = result.rows[0].id + 1;
  }

  return `CH${nextNumber}`;

};


const createChairman = async (data, client) => {
  const { chairmanName, email, phonenumber, password } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  // 1️⃣ Insert first WITHOUT chairman_code
  const insertQuery = `
    INSERT INTO chairmen
    (chairman_name, email, phone_number, password)
    VALUES ($1,$2,$3,$4)
    RETURNING id
  `;

  const insertValues = [chairmanName, email, phonenumber, hashedPassword];

  const insertResult = await client.query(insertQuery, insertValues);

  const id = insertResult.rows[0].id;

  // 2️⃣ Generate code safely
  const chairman_code = `CH-${Math.floor(100000 + Math.random() * 900000)}`;

  // 3️⃣ Update row
  await pool.query(
    `UPDATE chairmen SET chairman_code = $1 WHERE id = $2`,
    [chairman_code, id]
  );

  return { id, chairman_code };
};

const createChama = async (data, chairmanId, client) => {

  const { chamaName, frequency, description } = data;

  const query = `
    INSERT INTO chamas
    (chama_name, frequency, description, created_by)
    VALUES ($1,$2,$3,$4)
    RETURNING *
  `;

  const values = [chamaName, frequency, description, chairmanId];

  const result = await client.query(query, values);

  return result.rows[0];
};

const findUserByLogin = async (identifier) => {
  const query = `
    SELECT 
      id::text, -- Cast UUID to Text
      chairman_name AS name, 
      email, 
      password, 
      chama_id::text, -- Cast UUID to Text for consistency
      'chairman' AS role 
    FROM chairmen
    WHERE email = $1 OR phone_number = $1 OR chairman_code = $1

    UNION ALL

    SELECT 
      id::text, -- Cast Integer to Text
      name, 
      email, 
      password, 
      chama_id::text, -- Cast UUID to Text
      role 
    FROM admins
    WHERE email = $1

    UNION ALL

    -- MEMBERS 🔥 ADD THIS
    SELECT 
      id::text,
      name,
      email,
      password,
      chama_id::text,
      'member' AS role
    FROM members
    WHERE email = $1 OR phonenumber = $1

    LIMIT 1
  `;
  
  const { rows } = await pool.query(query, [identifier]);
  return rows[0] || null;
};
// const findChairmanByLogin = async (identifier) => {
//   const query = `
//     SELECT * FROM chairmen
//     WHERE email = $1 OR phone_number = $1 OR chairman_code = $1
//     LIMIT 1
//   `;
//   const { rows } = await pool.query(query, [identifier]);
//   return rows[0] || null;
// };
const findUserById = async (id, role) => {
  let query;
  let params;

  if (role === 'chairman') {
    query = `
      SELECT id::text, chairman_name AS name, email, 'chairman' AS role, chama_id::text
      FROM chairmen
      WHERE id = $1
    `;
    params = [id];

  } else if (role === 'member') {
    // 🔥 ADD THIS
    query = `
      SELECT id::text, name, email, 'member' AS role, chama_id::text
      FROM members
      WHERE id = $1
    `;
    params = [parseInt(id)];

  } else {
    // admins
    query = `
      SELECT id::text, name, email, role, chama_id::text
      FROM admins
      WHERE id = $1
    `;
    params = [parseInt(id)];
  }

  const result = await pool.query(query, params);
  return result.rows[0] || null;
};
const comparePassword = async (candidatePassword, hash) => {
  return bcrypt.compare(candidatePassword, hash);
};

module.exports = {
  createChairman,
  createChama,
  //findChairmanByLogin,
  comparePassword,
  //findChairmanById,
  findUserById,
  findUserByLogin,
};