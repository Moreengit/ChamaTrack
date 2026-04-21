const minutesService = require('../service/minutesService');

// UPLOAD MINUTES
const uploadMinutes = async (req, res) => {
  try {
    const file = req.file;

    const data = {
      title: req.body.title,
      meeting_date: req.body.date,
      description: req.body.description,
      file_name: file.originalname,
      file_url: file.path // or cloud URL later
    };

    const result = await minutesService.uploadMinutes(data, req.user);
    console.log("USER:", req.user);


    res.status(201).json({
      message: 'Minutes uploaded successfully',
      result
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MINUTES
const getMinutes = async (req, res) => {
  try {
    const minutes = await minutesService.getMinutes(req.user);
    res.json(minutes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteMinutes = async (req, res) => {
  try {
    await minutesService.deleteMinutes(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadMinutes,
  getMinutes,
  deleteMinutes
};