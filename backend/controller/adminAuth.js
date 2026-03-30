const adminService = require('../service/admin.service');

const registerAdmin = async (req, res) => {
  try {
    const chama_id = req.user.chama_id;
    const { admins } = req.body;

    if (!Array.isArray(admins) || admins.length === 0) {
      return res.status(400).json({ message: 'Admins data required' });
    }

    // validate roles
    for (const admin of admins) {
      if (!['secretary', 'treasurer'].includes(admin.role)) {
        return res.status(400).json({
          message: `Invalid role: ${admin.role}`
        });
      }
    }

    const result = await adminService.createAdmin({
      chama_id,
      admins
    });

    res.status(201).json({
      message: 'Admins created successfully',
      data: result
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const chama_id = req.user.chama_id;

    const admins = await adminService.getAdminsByChama(chama_id);

    res.status(200).json(admins);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { registerAdmin, getAdmins };