const minutesModel = require('../model/minutesModel');

// CREATE
const uploadMinutes = async (data, user) => {
  return await minutesModel.createMinutes({
    ...data,
    chama_id: user.chama_id,     // 🔥 important
    uploaded_by: user.id
  });
};

// GET
const getMinutes = async (user) => {
  return await minutesModel.getMinutesByChama(user.chama_id);
};

// DELETE
const deleteMinutes = async (id) => {
  return await minutesModel.deleteMinutes(id);
};

module.exports = {
  uploadMinutes,
  getMinutes,
  deleteMinutes
};