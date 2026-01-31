const express = require('express');
const router = express.Router();
const {
  getAllSettings,
  getSetting,
  upsertSetting,
  deleteSetting,
  getProductAttributes,
  updateProductAttributes
} = require('../controllers/settingsController');
const { protect, authorize } = require('../middleware/auth');

router.get('/attributes/list', getProductAttributes);

router.use(protect);
router.use(authorize('admin'));

router.get('/', getAllSettings);
router.get('/:key', getSetting);
router.put('/:key', upsertSetting);
router.delete('/:key', deleteSetting);
router.put('/attributes/update', updateProductAttributes);

module.exports = router;
