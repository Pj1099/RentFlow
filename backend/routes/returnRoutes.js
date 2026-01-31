const express = require('express');
const router = express.Router();
const {
  getAllReturns,
  getReturn,
  createReturn,
  completeReturn
} = require('../controllers/returnController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', getAllReturns);
router.post('/', createReturn);
router.get('/:id', getReturn);
router.put('/:id/complete', authorize('vendor', 'admin'), completeReturn);

module.exports = router;
