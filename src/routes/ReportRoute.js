const express = require('express');
const router = express.Router();

const {
  createReport,
  getAllReports,
  getMyReports,
  getReportById,
  updateStatus
} = require('../controllers/ReportController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// ✅ Create report (citoyen) + image optionnelle
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['citoyen']),
  upload.single('image'),
  createReport
);

// ✅ My reports
router.get(
  '/mine',
  authMiddleware,
  getMyReports
);

// ✅ All reports (citoyen/agent/admin)
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['citoyen', 'agent', 'admin']),
  getAllReports
);

// ✅ By id
router.get('/:id', authMiddleware, getReportById);

// ✅ Update status (agent/admin)
router.put(
  '/:id/status',
  authMiddleware,
  roleMiddleware(['agent', 'admin']),
  updateStatus
);

module.exports = router; // ✅ IMPORTANT: pas d'objet, juste le router
