const express = require('express');

const router = express.Router();

// GET Product model
var Product = require('../models/product');


/*
*  GET add product to cart
*/
router.get('/add/:product', function(req,res){

    var slug = req.params.product;

    Product.findOne({slug: 'home'}, function (err,p){
        if(err)
            console.log(err);
        
  
    if(typeof req.session.cart== "undefined"){
        req.session.cart = [];
        req.session.cart.puh({
            title: slug,
            qty: 1,
            price: parseFloat(p.price).toFixed(2),
            image: '/product_images' + p._id + '/' + p.image
        });

    } else {
        var cart = req.session.cart;
        var newItem = true;

        for(var i = 0; i < cart.length; i++){
            if(cart[i]. title == slug){
                cart[i].qty++;
                newItem = false;
                break;
            }
        }

        if(newItem){
            cart.push({
                title: slug,
                qty: 1,
                price: parseFloat(p.price).toFixed(2),
                image: '/product_images' + p._id + '/' + p.image
            });
        }
    }
    // console.log(req.session.cart);
    req.flash('success', 'Property added!');
    res.redirect('back');
    });

});


/*
* GET checkout page
*/
router.get('/checkout', function(req,res){


    res.render('checkout', {
        title: 'Checkout',
        cart: req.session.cart
    });


});

//exports
module.exports = router;