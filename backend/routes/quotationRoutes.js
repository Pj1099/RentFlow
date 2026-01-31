const express = require('express');
const router = express.Router();
const {
  getAllQuotations,
  getQuotation,
  createQuotation,
  updateQuotation,
  confirmQuotation,
  deleteQuotation
} = require('../controllers/quotationController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getAllQuotations);
router.post('/', createQuotation);
router.get('/:id', getQuotation);
router.put('/:id', updateQuotation);
router.put('/:id/confirm', confirmQuotation);
router.delete('/:id', deleteQuotation);

module.exports = router;
