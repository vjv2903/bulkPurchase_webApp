var mongoose = require('mongoose');  

var UserSchema = new mongoose.Schema({  
  name: String,
  email: {type: String, unique: true},
  isVendor: {type: Boolean, required: true},
  password: String
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
