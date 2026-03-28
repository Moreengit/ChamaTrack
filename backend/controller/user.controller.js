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



module.exports = {
  registerChama,
  loginChairman
};