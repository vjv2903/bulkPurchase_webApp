var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('./auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/user');
var Vendor = require('../models/vendor')
var Product = require('../models/product')
var Consumer = require('../models/consumer')

router.post('/create_product', VerifyToken, function(req, res, next) {

    Vendor.findOne({userId: req.userId}, function (err, vendor) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!vendor) return res.status(401).send("Not Authorized"); 
      
      Product.create({
          name: req.body.name,
          qty: req.body.qty,
          price: req.body.price,
          VendorId: vendor._id, 
          status: 'waiting'
      }, function(err) {
        if (err) return res.status(500).send("There was a problem registering the user`.");
      });
    });

    return res.status(200).send("product created successfully");
  
});

router.get('/products', function(req, res, next) {
    
    query = {}
    if(req.query.name) {
        query.name = req.query.name;
    }
    if(req.query.status) {
        query.status = req.query.status;
    }
    if(req.query.VendorId) {
        query.VendorId = req.query.VendorId;
    }
    if(req.query.Id) {
        query._id = req.query.Id;
    }
    
    Product.find(query, function(err, product) {
        if(err) return res.status(500).send("There was a problem listing the products");
        
        return res.status(200).send(product);
    });
})

router.get('/vendproducts', VerifyToken, function(req, res, next) {
    
    query = {}
    if(req.query.name) {
        query.name = req.query.name;
    }
    if(req.query.status) {
        query.status = req.query.status;
    }
    if(req.query.VendorId) {
        query.VendorId = req.query.VendorId;
    }
    if(req.query.Id) {
        query._id = req.query.Id;
    }
    
    Vendor.findOne({userId: req.userId}, function(err, vendor) {
        if(err) return res.status(500).send("There was a problem listing the products");
        query.VendorId = vendor._id;
        console.log(query);
        Product.find(query, function(err, product) {
            if(err) return res.status(500).send("There was a problem listing the products");
            console.log(vendor)
            return res.status(200).send(product);
        });
    })
    
})

router.get('/yourorders', VerifyToken, function(req, res, next) {
    
    console.log('order details requested');
    Consumer.find({userId: req.userId}, function(err, consumers) {
        if (err) return res.status(500).send("Problem in server");
        // if (!consumer) return res.status(404).send("")
        console.log(consumers); 
        return res.status(200).send(consumers);
    });
});

router.post('/:productid/order', VerifyToken, function(req, res, next) {
    
    Product.findById(req.params.productid, function(err, product) {
        if(err) return res.status(500).send("Problem in server");
        if(!product) return res.status(404).send("Product Not found")
        prqty = product.qty;
        prqty -= req.body.qty;
        if(prqty < 0) {
            return res.status(400).send("Product not available");
        }
        update = {};
        update.qty = prqty;
        if(prqty === 0) {
            update.status = "placed";
        }
        console.log(update);
        Product.findByIdAndUpdate(req.params.productid, update, {
            new: true
        }, function(err, product) {
            if (err) {
                return res.status(500).send("could not place order");
            }
            console.log(product);
        });
        Consumer.create({
            userId: req.userId,
            productId: req.params.productid,
            qty: req.body.qty,
            rating: 0,
            review: ''
        }, function(err) {
            if(err) return res.status(500).send("There was a problem ordering");
        });

        return res.status(200).send("Ordered successfully!");
    });

});

router.put('/:productid/dispatch', VerifyToken, function(req, res, next) {
    
    Vendor.findOne({userId: req.userId}, function (err, vendor) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!vendor) return res.status(401).send("Not Authorized");
    
    
        Product.findById(req.params.productid, function(err, product) {
            if (err) return res.status(500).send("Problem connecting server");
            if (!product) return res.status(404).send("Product not found");
            // console.log(product.VendorId);
            // console.log(vendor._id);
            if (!product.VendorId === vendor._id) {
                return res.status(401).send("Not authorized");
            }
            update = {
                'status': 'dispatched',
                'qty': 0
            }

            Product.findByIdAndUpdate(req.params.productid, update, {
                new: true
            }, function(err, product) {
                if (err) {
                    return res.status(500).send("could not dispatch order");
                }
                console.log(product);
            });

            return res.status(200).send("Order dispatched");
        })
    })
});

router.put('/:productid/cancel', VerifyToken, function(req, res, next) {
    
    Vendor.findOne({userId: req.userId}, function (err, vendor) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!vendor) return res.status(401).send("Not Authorized");
    
    
        Product.findById(req.params.productid, function(err, product) {
            if (err) return res.status(500).send("Problem connecting server");
            if (!product) return res.status(404).send("Product not found");
            // console.log(product.VendorId);
            // console.log(vendor._id);
            if (!product.VendorId === vendor._id) {
                return res.status(401).send("Not authorized");
            }
            update = {
                'status': 'cancelled',
                'qty': 0
            }

            Product.findByIdAndUpdate(req.params.productid, update, {
                new: true
            }, function(err, product) {
                if (err) {
                    return res.status(500).send("could not cancel order");
                }
                console.log(product);
            });

            return res.status(200).send("Order Cancelled");
        })
    })
});

router.get('/vendor/:vendorid', function(req, res, next) {
    Vendor.findById(req.params.vendorid, function(err, vendor) {
        if (err) return res.status(500).send("Problem connecting server");
        if (!vendor) return res.status(404).send("Vendor not found");

        return res.status(200).send(vendor);
    });
});

router.put('/vendor/:vendorid/rate', VerifyToken, function(req, res, next) {
    // console.log('vendor');
    Vendor.findById(req.params.vendorid, function(err, vendor) {
        if (err) return res.status(500).send("problem in server");
        if (!vendor) return res.status(404).send("Vendor not found");
        let totalRating = vendor.totalRating*vendor.numberRating;
        vendor.numberRating += 1;
        console.log(totalRating);
        totalRating += Number(req.body.rating);
        console.log(totalRating);
        totalRating = totalRating/vendor.numberRating;
        console.log(totalRating);
        vendor.totalRating = totalRating.toFixed(1);
        vendor.save();
        return res.status(200).send("success");
    });
})

router.put('/product/:productid/rate', VerifyToken, function(req, res, next) {
    // console.log('vendor');
    Consumer.findOne({userId: req.userId, productId: req.params.productid}, function(err, product) {
        if (err) return res.status(500).send("problem in server");
        if (!product) return res.status(404).send("Product not found");
        product.rating = req.body.rating;
        product.review = req.body.review;
        product.save();
        return res.status(200).send("Product Reviewed");
    })
})

router.get('/orders', function(req, res, next) {
    Consumer.find({productId: req.query.product}, function(err, consumer) {
        if (err) return res.status(500).send("problem in server");
        if (!consumer) return res.status(404).send("Product not found");
        return res.status(200).send(consumer);
    })
})
module.exports = router;