const mongoose = require("mongoose");
const { Schema } = mongoose;

const verificationCodeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true,"userId is required"] },
    code: { type: String, required: [true, 'Verification code is required'] },
    status: {
      type: String,
      enum: ['PENDING', 'USED', 'EXPIRED'],
      default: 'PENDING'
    },
    type: {
      type: String,
      enum: ['ACCOUNT_ACTIVATION', 'PASSWORD_RESET'],
      required: true
    },
    issuedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: [true, 'Expiration time is required'] },
    verifiedAt: { type: Date }
  });
  
  verificationCodeSchema.pre('save', function(next) {
    if (this.expiresAt <= this.issuedAt) {
      return next(new Error('Expiration time must be after issued time'));
    }
    next();
  });
  
  const VerificationCode = mongoose.model('VerificationCode', verificationCodeSchema);
  module.exports = VerificationCode;