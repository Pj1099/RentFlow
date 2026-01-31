const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  pickupNumber: {
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
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'damaged'],
      default: 'good'
    }
  }],
  pickupDate: {
    type: Date,
    default: Date.now
  },
  scheduledDate: Date,
  pickupAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  instructions: String,
  signature: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate pickup number
pickupSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Pickup').countDocuments();
    this.pickupNumber = `PK${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Pickup', pickupSchema);
