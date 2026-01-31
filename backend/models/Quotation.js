const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  quotationNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    rentalStartDate: {
      type: Date,
      required: true
    },
    rentalEndDate: {
      type: Date,
      required: true
    },
    rentalDuration: {
      value: Number,
      unit: { type: String, enum: ['hour', 'day', 'week', 'month'] }
    },
    pricePerUnit: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    }
  }],
  subtotal: {
    type: Number,
    required: true
  },
  taxRate: {
    type: Number,
    default: 18
  },
  taxAmount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'confirmed', 'expired', 'cancelled'],
    default: 'draft'
  },
  notes: {
    type: String,
    trim: true
  },
  validUntil: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate quotation number
quotationSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Quotation').countDocuments();
    this.quotationNumber = `QT${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Quotation', quotationSchema);
