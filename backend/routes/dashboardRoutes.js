const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getVendorPerformance,
  getOrderTrends,
  exportReport
} = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/order-trends', getOrderTrends);
router.get('/export', exportReport);
router.get('/vendor-performance', authorize('admin'), getVendorPerformance);

module.exports = router;
