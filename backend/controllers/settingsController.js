const Settings = require('../models/Settings');

// @desc    Get all settings
// @route   GET /api/settings
// @access  Private (Admin)
exports.getAllSettings = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};

    const settings = await Settings.find(query);

    res.status(200).json({
      success: true,
      count: settings.length,
      settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching settings'
    });
  }
};

// @desc    Get single setting
// @route   GET /api/settings/:key
// @access  Private
exports.getSetting = async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: req.params.key });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    res.status(200).json({
      success: true,
      setting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching setting'
    });
  }
};

// @desc    Create or update setting
// @route   PUT /api/settings/:key
// @access  Private (Admin)
exports.upsertSetting = async (req, res) => {
  try {
    const { value, category, description } = req.body;

    const setting = await Settings.findOneAndUpdate(
      { key: req.params.key },
      {
        key: req.params.key,
        value,
        category,
        description,
        updatedAt: Date.now()
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Setting updated successfully',
      setting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating setting'
    });
  }
};

// @desc    Delete setting
// @route   DELETE /api/settings/:key
// @access  Private (Admin)
exports.deleteSetting = async (req, res) => {
  try {
    const setting = await Settings.findOneAndDelete({ key: req.params.key });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Setting deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting setting'
    });
  }
};

// @desc    Get product attributes
// @route   GET /api/settings/attributes/list
// @access  Public
exports.getProductAttributes = async (req, res) => {
  try {
    const attributes = await Settings.findOne({ key: 'product_attributes' });

    if (!attributes) {
      return res.status(200).json({
        success: true,
        attributes: []
      });
    }

    res.status(200).json({
      success: true,
      attributes: attributes.value || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product attributes'
    });
  }
};

// @desc    Update product attributes
// @route   PUT /api/settings/attributes/update
// @access  Private (Admin)
exports.updateProductAttributes = async (req, res) => {
  try {
    const { attributes } = req.body;

    const setting = await Settings.findOneAndUpdate(
      { key: 'product_attributes' },
      {
        key: 'product_attributes',
        value: attributes,
        category: 'attributes',
        description: 'Product attributes and their values',
        updatedAt: Date.now()
      },
      {
        new: true,
        upsert: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Product attributes updated successfully',
      setting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product attributes'
    });
  }
};
