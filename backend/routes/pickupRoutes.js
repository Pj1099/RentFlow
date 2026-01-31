const express = require('express');
const router = express.Router();
const {
  getAllPickups,
  getPickup,
  createPickup,
  completePickup
} = require('../controllers/pickupController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', getAllPickups);
router.post('/', authorize('vendor', 'admin'), createPickup);
router.get('/:id', getPickup);
router.put('/:id/complete', authorize('vendor', 'admin'), completePickup);

module.exports = router;
