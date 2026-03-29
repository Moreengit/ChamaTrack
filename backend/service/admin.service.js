const bcrypt = require('bcrypt');
const adminModel = require('../model/admin.model.js');

const createAdmin = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await adminModel.create({
    chama_id: data.chama_id,
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role
  });
};

module.exports = { createAdmin };