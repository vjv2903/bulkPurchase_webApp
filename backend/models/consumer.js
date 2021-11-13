var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var User = require("./user")
var Product = require("./product")

var ConsumerSchema = new mongoose.Schema({  
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
    qty: Number,
    rating: Number,
    review: String
});

mongoose.model('Consumer', ConsumerSchema);

module.exports = mongoose.model('Consumer');
