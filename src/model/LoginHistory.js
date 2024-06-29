const mongoose = require("mongoose");
const { Schema } = mongoose;


const loginHistorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ipAddress: { type: String, required: [true, 'IP address is required'] },
    userAgent: { type: String, required: [true, 'User agent is required'] },
    attempt: {
      type: String,
      enum: ['SUCCESS', 'FAILED'],
      default: 'SUCCESS'
    },
    loginAt: { type: Date, default: Date.now }
  });
  
  const LoginHistory = mongoose.model('LoginHistory', loginHistorySchema);