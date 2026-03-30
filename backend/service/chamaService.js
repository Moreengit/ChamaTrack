const chamaModel = require('../model/chama');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const pool = require('../config/db');

const registerChama = async (data) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const chairman = await chamaModel.createChairman(data, client);
    const chama = await chamaModel.createChama(data, chairman.id, client);

    await client.query(
      `UPDATE chairmen SET chama_id = $1 WHERE id = $2`,
      [chama.id, chairman.id]
    );

    await client.query('COMMIT');

    return {
      chairmanId: chairman.id,
      chairmancode: chairman.chairman_code,
      chama
    };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const loginChairman = async ({ identifier, password }) => {
  const chairman = await chamaModel.findChairmanByLogin(identifier);

  if (!chairman) {
    throw new Error('Invalid login credentials');
  }

  const isMatch = await chamaModel.comparePassword(password, chairman.password);
  if (!isMatch) {
    throw new Error('Invalid login credentials');
  }
   const token = jwt.sign(
    {
      id: chairman.id,
      role: 'chairman',
      chama_id: chairman.chama_id
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // Optional: generate token here if using JWT
  return {
    token,
    chairmanId: chairman.id,
    chairmanCode: chairman.chairman_code,
    name: chairman.chairman_name,
    email: chairman.email,
    phoneNumber: chairman.phone_number
  };
};

const getChairmanProfile = async (chairmanId) => {
  const chairman = await chamaModel.findChairmanById(chairmanId);

  if (!chairman) {
    throw new Error("Chairman not found");
  }

  return {
    id: chairman.id,
    chairmanName: chairman.chairman_name,
    email: chairman.email,
    chairmanCode: chairman.chairman_code,
    
  };
};


module.exports = {
   loginChairman,
   registerChama,
   getChairmanProfile
};