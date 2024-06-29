const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailSchema = new Schema({
    recipient: {
      type: String,
      required: [true, 'Recipient email is required'],
      validate: {
        validator: function(v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    subject: { type: String, required: [true, 'Subject is required'] },
    body: { type: String, required: [true, 'Email body is required'] },
    source: { type: String, required: [true, 'Email source is required'] },
    sentAt: { type: Date, default: Date.now }
  });
  
  const Email = mongoose.model('Email', emailSchema);
  
  module.exports = Email;