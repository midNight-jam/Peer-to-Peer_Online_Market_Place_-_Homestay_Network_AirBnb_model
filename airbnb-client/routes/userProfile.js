var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.get('/userProfile', function(req, res, next){
	var json_response = '';
	console.log("In getUserProfile username ");
	var msg_payload = {"username": req.user};
	mq_client.make_request("getProfile_queue", msg_payload, function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            console.log("what result is", result);
            if(result.code == '200'){
            	json_response = {'statusCode': result.code, 'profile': result.value};
            	res.send(json_response);
            }
            else{
            	json_response = {'statusCode': '400', 'message': 'Something went wrong'};
            	res.send(json_response);
            }	
        }
    }); 
});

router.post('/editProfile', function(req, res, next){
	var json_response = '';
	console.log("I am in edit profile username "+ req.body.data);
	var payload = {'userData': req.body.data};
	mq_client.make_request("editProfile_queue", payload, function (err, result) {

        if (err) {
            console.log(err);
            throw err;
        }
        else {
            console.log("what result is", result);
            if(result.code == '200'){
            	json_response = {'statusCode': '200', 'message': 'Profile Updated Successfully!'};
            	res.send(json_response);
            }
            else{
            	json_response = {'statusCode': '400', 'message': 'Oops! Something went wrong, please try again later.'};
            	res.send(json_response);
            }	
        }

    }); 
});

router.post('/paymentDetails', function(req, res, next){
	var json_response = '';
	console.log("I am in payment details username "+ req.body.data);
	var payload = {'userData': req.body.data, 'email':req.body.email};
	if(req.body.data.cardNumber.length != '16'){
		json_response = {'statusCode': '400', 'message': 'Credit Card Number should be 16 digits!'};
    	res.send(json_response);
	}else{	
		mq_client.make_request("paymentDetails_queue", payload, function (err, result) {
	        if (err) {
	            console.log(err);
	            throw err;
	        }
	        else {
	            console.log("what result is", result);
	            if(result.code == '200'){
	            	json_response = {'statusCode': '200', 'message': 'Payment Method Added Successfully!'};
	            	res.send(json_response);
	            }else if(result.code == '201'){
	            	json_response = {'statusCode': '201', 'message': 'Payment method already exists!'};
	            	res.send(json_response);
	            }
	            else{
	            	json_response = {'statusCode': '400', 'message': 'Oops! Something went wrong, please try again later.'};
	            	res.send(json_response);
	            }	
	        }
	    });
	}
});

router.get('/getPaymentDetails', function(req, res, next){
	var json_response = '';
	console.log("I am in getPaymentDetails username "+ req.user);
	var payload = {'email': req.user};
	mq_client.make_request("getPaymentDetails_queue", payload, function (err, result) {

        if (err) {
            console.log(err);
            throw err;
        }
        else {
            console.log("what result is", result);
            if(result.code == '200'){
            	json_response = {'statusCode': '200', 'payment': result.value};
            	res.send(json_response);
            }
            else{
            	json_response = {'statusCode': '400', 'message': 'Oops! Something went wrong, please try again later.'};
            	res.send(json_response);
            }	
        }

    }); 
});

module.exports = router;