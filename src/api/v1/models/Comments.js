const { Schema, model } = require('mongoose');


const CommentsSchema = new Schema({
  client_name: {
    type: String
  },
  client_email: {
    type: String,
    required: true
  },
  client_phone: {
    type: String
  },
  client_comment: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Comment = model('Comment', CommentsSchema);


module.exports = Comment