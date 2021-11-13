var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var Vendor = require('./vendor');

var ProductSchema = new mongoose.Schema({  
  name: String,
  qty: Number,
  price: Number,
  VendorId: {type: Schema.Types.ObjectId, ref: 'Vendor'},
  status: String
});

mongoose.model('Product', ProductSchema);

module.exports = mongoose.model('Product');
