const Quotation = require('../models/Quotation');
const Product = require('../models/Product');

// @desc    Get all quotations
// @route   GET /api/quotations
// @access  Private
exports.getAllQuotations = async (req, res) => {
  try {
    const query = {};

    // Customer can only see their quotations
    if (req.user.role === 'customer') {
      query.customer = req.user.id;
    }

    // Vendor can see quotations for their products
    if (req.user.role === 'vendor') {
      const products = await Product.find({ vendor: req.user.id }).select('_id');
      const productIds = products.map(p => p._id);
      query['items.product'] = { $in: productIds };
    }

    const quotations = await Quotation.find(query)
      .populate('customer', 'name email companyName')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quotations.length,
      quotations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quotations'
    });
  }
};

// @desc    Get single quotation
// @route   GET /api/quotations/:id
// @access  Private
exports.getQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate('customer', 'name email companyName gstin phone address')
      .populate('items.product', 'name images vendor');

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Quotation not found'
      });
    }

    // Check access
    if (
      req.user.role === 'customer' && 
      quotation.customer._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this quotation'
      });
    }

    res.status(200).json({
      success: true,
      quotation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quotation'
    });
  }
};

// @desc    Create quotation
// @route   POST /api/quotations
// @access  Private (Customer)
exports.createQuotation = async (req, res) => {
  try {
    const { items, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Quotation must have at least one item'
      });
    }

    // Calculate totals
    let subtotal = 0;
    const quotationItems = [];

    for (let item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`
        });
      }

      // Check availability
      const isAvailable = product.checkAvailability(
        item.quantity,
        item.rentalStartDate,
        item.rentalEndDate
      );

      if (!isAvailable) {
        return res.status(400).json({
          success: false,
          message: `Product "${product.name}" is not available for the selected dates`
        });
      }

      // Calculate rental duration and price
      const startDate = new Date(item.rentalStartDate);
      const endDate = new Date(item.rentalEndDate);
      const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

      let pricePerUnit = 0;
      let rentalDuration = {};

      if (durationInDays < 1) {
        // Hourly rental
        const hours = Math.ceil((endDate - startDate) / (1000 * 60 * 60));
        pricePerUnit = product.rentalPricing.hourly || 0;
        rentalDuration = { value: hours, unit: 'hour' };
      } else if (durationInDays < 7) {
        // Daily rental
        pricePerUnit = product.rentalPricing.daily || 0;
        rentalDuration = { value: durationInDays, unit: 'day' };
      } else {
        // Weekly rental
        const weeks = Math.ceil(durationInDays / 7);
        pricePerUnit = product.rentalPricing.weekly || 0;
        rentalDuration = { value: weeks, unit: 'week' };
      }

      const totalPrice = pricePerUnit * item.quantity * rentalDuration.value;

      quotationItems.push({
        product: item.product,
        quantity: item.quantity,
        rentalStartDate: item.rentalStartDate,
        rentalEndDate: item.rentalEndDate,
        rentalDuration,
        pricePerUnit,
        totalPrice
      });

      subtotal += totalPrice;
    }

    // Calculate tax
    const taxRate = 18; // 18% GST
    const taxAmount = (subtotal * taxRate) / 100;
    const totalAmount = subtotal + taxAmount;

    // Set validity (7 days from now)
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 7);

    const quotation = await Quotation.create({
      customer: req.user.id,
      items: quotationItems,
      subtotal,
      taxRate,
      taxAmount,
      totalAmount,
      notes,
      validUntil,
      status: 'draft'
    });

    await quotation.populate('customer', 'name email companyName');
    await quotation.populate('items.product', 'name images');

    res.status(201).json({
      success: true,
      message: 'Quotation created successfully',
      quotation
    });
  } catch (error) {
    console.error('Create quotation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating quotation',
      error: error.message
    });
  }
};

// @desc    Update quotation
// @route   PUT /api/quotations/:id
// @access  Private
exports.updateQuotation = async (req, res) => {
  try {
    let quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Quotation not found'
      });
    }

    // Only customer who created it can update
    if (quotation.customer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this quotation'
      });
    }

    // Can only update if status is draft
    if (quotation.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Only draft quotations can be updated'
      });
    }

    req.body.updatedAt = Date.now();
    quotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('customer', 'name email').populate('items.product', 'name');

    res.status(200).json({
      success: true,
      message: 'Quotation updated successfully',
      quotation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating quotation'
    });
  }
};

// @desc    Confirm quotation (convert to order)
// @route   PUT /api/quotations/:id/confirm
// @access  Private (Customer)
exports.confirmQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Quotation not found'
      });
    }

    if (quotation.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (quotation.status === 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Quotation already confirmed'
      });
    }

    // Check if quotation is still valid
    if (new Date() > quotation.validUntil) {
      quotation.status = 'expired';
      await quotation.save();
      return res.status(400).json({
        success: false,
        message: 'Quotation has expired'
      });
    }

    quotation.status = 'confirmed';
    await quotation.save();

    res.status(200).json({
      success: true,
      message: 'Quotation confirmed successfully. Please proceed to create an order.',
      quotation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error confirming quotation'
    });
  }
};

// @desc    Delete quotation
// @route   DELETE /api/quotations/:id
// @access  Private
exports.deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Quotation not found'
      });
    }

    if (quotation.customer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await quotation.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Quotation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting quotation'
    });
  }
};
