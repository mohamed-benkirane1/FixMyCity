const mongoose = require('mongoose');
const Report = require('../models/ReportModel');

const createReport = async (req, res) => {
  try {
    const { title, description, type, latitude, longitude } = req.body || {};

    // ✅ Validation champs texte
    if (!title || !description || !type || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: "title, description, type, latitude and longitude are required" });
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    // ✅ Validation nombres
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return res.status(400).json({ error: "latitude and longitude must be valid numbers" });
    }

    // ✅ Image (si envoyée)
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const report = new Report({
      title,
      description,
      type,
      image: imagePath,
      latitude: lat,
      longitude: lng,
      userId: req.user.id
    });

    await report.save();
    return res.status(201).json({ report });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllReports = async (req, res) => {
  try {
    const { status, type } = req.query || {};
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const reports = await Report.find(filter).populate('userId', 'name email');
    return res.status(200).json({ reports });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id });
    return res.status(200).json({ reports });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const report = await Report.findById(id).populate('userId', 'name email');
    if (!report) return res.status(404).json({ error: 'Report not found' });
    return res.status(200).json({ report });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    if (!['recu', 'en_cours', 'resolu'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const report = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!report) return res.status(404).json({ error: 'Report not found' });
    return res.status(200).json({ report });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getMyReports,
  getReportById,
  updateStatus
};
