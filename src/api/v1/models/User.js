const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String
  },
  admin: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  is_admin: {
    type: Boolean,
    default: false
  },
});

const User = model('User', UserSchema)


module.exports = User