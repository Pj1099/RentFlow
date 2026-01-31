const express = require('express');
const router = express.Router();
const {
  getAllInvoices,
  getInvoice,
  createInvoice,
  addPayment,
  updateInvoiceStatus
} = require('../controllers/invoiceController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', getAllInvoices);
router.post('/', authorize('vendor', 'admin'), createInvoice);
router.get('/:id', getInvoice);
router.post('/:id/payment', addPayment);
router.put('/:id/status', authorize('vendor', 'admin'), updateInvoiceStatus);

module.exports = router;
