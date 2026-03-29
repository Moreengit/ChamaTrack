const chamaService = require('../service/chamaService');

const registerChama = async (req, res) => {
  try {

    const data = req.body;

    const result = await chamaService.registerChama(data);

    res.status(201).json({
      message: "Chama registered successfully",
      data: result
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to register chama"
    });

  }
};

const loginChairman = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const result = await chamaService.loginChairman({ identifier, password });

    res.status(200).json({
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

const getChairman = async (req, res) => {
  try {
    const chairmanId = req.user.id; // from JWT middleware

    const chairman = await chamaService.getChairmanProfile(chairmanId);

    res.status(200).json({
      chairmanName: chairman.chairmanName,
      chairmanCode: chairman.chairmanCode,
      email: chairman.email
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch chairman profile"
    });
  }
};




module.exports = {
  registerChama,
  loginChairman,
  getChairman
};