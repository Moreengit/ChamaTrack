const chamaModel = require('../model/chama');

const registerChama = async (data) => {

  const chairman = await chamaModel.createChairman(data);

  const chama = await chamaModel.createChama(data, chairman.id);

  return {
    chairmanId: chairman.id,
    chairmancode: chairman.chairman_code,
    chama
  };
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

  // Optional: generate token here if using JWT
  return {
    chairmanId: chairman.id,
    chairmanCode: chairman.chairman_code,
    name: chairman.chairman_name,
    email: chairman.email,
    phoneNumber: chairman.phone_number
  };
};


module.exports = {
   loginChairman,
   registerChama,
};