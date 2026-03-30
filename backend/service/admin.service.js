const bcrypt = require('bcrypt');
const adminModel = require('../model/admin.model.js');

const createAdmin = async ({ chama_id, admins }) => {
  const results = [];

  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    const created = await adminModel.create({
      chama_id,
      name: admin.name,
      email: admin.email,
      password: hashedPassword,
      role: admin.role
    });

    results.push(created);
  }

  return results;
};
const getAdminsByChama = async (chama_id) => {
  return await adminModel.findByChama(chama_id);
};



module.exports = { createAdmin, getAdminsByChama };