const { Schema, model } = require('mongoose');


const CommentsSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  text: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Comment = model('Comment', CommentsSchema);


module.exports = Comment