const adminService = require('../service/admin.service');

const registerAdmin = async (req, res) => {
  try {
    const chama_id = req.user.chama_id; // FIXED KEY

    const { name, email, password, role } = req.body;

    if (!['secretary', 'treasurer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const result = await adminService.createAdmin({
      chama_id,   // FIXED
      name,
      email,
      password,
      role
    });

    res.status(201).json({
      message: `${role} created successfully`,
      data: result
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerAdmin };