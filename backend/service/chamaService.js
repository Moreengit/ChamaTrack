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
  const user = await chamaModel.findUserByLogin(identifier);

  if (!user) {
    throw new Error('Invalid login credentials');
  }

  const isMatch = await chamaModel.comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid login credentials');
  }
   const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      chama_id: user.chama_id
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // Optional: generate token here if using JWT
  return {
    token,
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    chamaId: user.chama_id
  };
};

const getChairmanProfile = async (chairmanId) => {
  const chairman = await chamaModel.findUserById(chairmanId);

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