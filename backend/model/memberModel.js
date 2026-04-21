const pool = require('../config/db');

// CREATE MEMBER
const createMember = async (member) => {
  const { name, email, phoneNumber, password, chama_id } = member;

  const query = `
    INSERT INTO members (name, email, phonenumber, password, chama_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [name, email, phoneNumber, password, chama_id];
  const result = await pool.query(query, values);

  return result.rows[0];
};

// GET ALL MEMBERS
const getAllMembers = async () => {
  const result = await pool.query('SELECT * FROM members ORDER BY id DESC');
  return result.rows;
};

// GET BY ID
const getMemberById = async (id) => {
  const result = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
  return result.rows[0];
};

// UPDATE MEMBER
const updateMember = async (id, member) => {
  const { name, email, phoneNumber, password } = member;

  const query = `
    UPDATE members
    SET name=$1, email=$2, phonenumber=$3, password=$4
    WHERE id=$5
    RETURNING *;
  `;

  const values = [name, email, phoneNumber, password, id];
  const result = await pool.query(query, values);

  return result.rows[0];
};

// DELETE MEMBER
const deleteMember = async (id) => {
  await pool.query('DELETE FROM members WHERE id=$1', [id]);
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember
};