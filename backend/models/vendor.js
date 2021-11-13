var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');  

var VendorSchema = new mongoose.Schema({  
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  name: String,
  totalRating: Number,
  numberRating: Number   
});

mongoose.model('Vendor', VendorSchema);

module.exports = mongoose.model('Vendor');