const bcrypt = require('bcrypt');
const memberModel = require('../model/memberModel');

// REGISTER MEMBER
const registerMember = async (data, user) => {
  const { name, email, phoneNumber, password } = data;

  // HASH PASSWORD 🔐
  const hashedPassword = await bcrypt.hash(password, 10);

  return await memberModel.createMember({
    name,
    email,
    phoneNumber,
    password: hashedPassword,
    chama_id: user.chama_id
  });
};

// GET MEMBERS
const getMembers = async () => {
  return await memberModel.getAllMembers();
};

// UPDATE MEMBER
const updateMember = async (id, data) => {
  let updatedData = { ...data };

  if (data.password) {
    updatedData.password = await bcrypt.hash(data.password, 10);
  }

  return await memberModel.updateMember(id, updatedData);
};

// DELETE MEMBER
const deleteMember = async (id) => {
  return await memberModel.deleteMember(id);
};

module.exports = {
  registerMember,
  getMembers,
  updateMember,
  deleteMember
};