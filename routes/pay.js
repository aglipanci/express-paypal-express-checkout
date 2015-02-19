var express = require('express');
var router = express.Router();
//Require the paypal module and the configurations
var paypal = require('paypal-rest-sdk');	
require('../configure');

router.get('/', function(req, res, next) {
	
	//create tge payment request
	var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/pay/success",
        "cancel_url": "http://localhost:3000/pay/cancel"
    },
	"transactions": [{
	    "item_list": {
		        "items": [{
		            "name": "NodeJs Express $150",
		            "sku": "node-js",
		            "price": "150.00",
		            "currency": "USD",
		            "quantity": 1
		        }]
		    },
		    "amount": {
		        "currency": "USD",
		        "total": "150.00"
		    },
		    "description": "NodeJs Express Checkout REST API"
		}]
	};

	//call the payment create and handle the response
	paypal.payment.create(create_payment_json, function (error, payment) {
	    if (error) {
	        throw error;
	    } else {
        	console.log(payment);

	        //redirect to the approval url
	        res.redirect(payment.links[1].href);
	        res.end;
	    }
	});

});

//handle the success and execute payment
router.get('/success', function(req, res, next) {

		//prepare executement
		var execute_payment_json = {
		    "payer_id": req.query.PayerID,
		    "transactions": [{
		        "amount": {
		            "currency": "USD",
		            "total": "150.00"
		        }
		    }]
		};

		var paymentId = req.query.paymentId;

		//execute payment
		paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
		    if (error) {
		        console.log(error.response);
		        throw error;
		        res.render('response', { paypal_response: 'ERROR', paypal_response_body: error.response});
		    } else {
		        console.log("Get Payment Response");
		        console.log(JSON.stringify(payment));
		        var paypal_res_body = JSON.stringify(payment);
				res.render('response', { paypal_response: 'SUCCESS', paypal_response_body: paypal_res_body});
		    }
		});
});

//handle the cancelation
router.get('/cancel', function(req, res, next){
	var paypal_res_body = JSON.stringify(req.query);
	res.render('response', { paypal_response: 'CANCEL', paypal_response_body: paypal_res_body});
});

module.exports = router;
