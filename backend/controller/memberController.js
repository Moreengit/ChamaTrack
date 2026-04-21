const memberService = require('../service/memberService');

// REGISTER
const registerMember = async (req, res) => {
  try {
    const member = await memberService.registerMember(req.body, req.user);

    res.status(201).json({
      message: 'Member registered successfully',
      member
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getMembers = async (req, res) => {
  try {
    const members = await memberService.getMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateMember = async (req, res) => {
  try {
    const updated = await memberService.updateMember(req.params.id, req.body);

    res.json({
      message: 'Member updated successfully',
      updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteMember = async (req, res) => {
  try {
    await memberService.deleteMember(req.params.id);

    res.json({ message: 'Member deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerMember,
  getMembers,
  updateMember,
  deleteMember
};