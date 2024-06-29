const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: [true, 'Feedback body is required'] },
    content: { type: Schema.Types.ObjectId, ref: 'Content', required: true },
  }, { timestamps: true });
  
  const Feedback = mongoose.model('Feedback', feedbackSchema);
  
  module.exports = Feedback;