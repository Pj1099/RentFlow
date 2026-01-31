const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  returnNumber: {
    type: String,
    unique: true,
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendor: {
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
    quantity: Number,
    conditionOnReturn: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'damaged', 'lost'],
      default: 'good'
    },
    damageNotes: String,
    damageFee: {
      type: Number,
      default: 0
    }
  }],
  returnDate: {
    type: Date,
    default: Date.now
  },
  expectedReturnDate: Date,
  isLate: {
    type: Boolean,
    default: false
  },
  lateDays: {
    type: Number,
    default: 0
  },
  lateReturnFee: {
    type: Number,
    default: 0
  },
  totalDamageFee: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'processing'],
    default: 'scheduled'
  },
  returnAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  signature: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate return number
returnSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Return').countDocuments();
    this.returnNumber = `RT${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Return', returnSchema);
