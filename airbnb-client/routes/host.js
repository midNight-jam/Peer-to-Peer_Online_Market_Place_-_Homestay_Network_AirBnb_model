var mq_client = require('../rpc/client');
var addressValidator = require('address-validator');
var address = addressValidator.Address;
var _ = require('underscore');

function newListing(req,res) {

    mq_client.make_request("newListing_queue", req.body, function (err, result) {

        if (err) {
            console.log(err);
            throw err;
        }
        else {
            console.log("what rresult is", result);
            res.send(result);
        }

    });

}
     module.exports.addressValidator =function(req, res) {
        var json_responses = '';
        address = req.body.address + ", " + req.body.city + ", " + req.body.state + ", " + req.body.country;
        console.log("Address " + address);
        var unknownAddresses = [];
        addressValidator.validate(address, addressValidator.match.unknown, function (err, exact, inexact) {
            if (err) {
                console.log('in error');
                json_responses = {'statusCode': '401', 'error': 'Please enter valid data'};
            } else {
                if (exact != '' && exact != null) {
                    console.log('in match found');
                    json_responses = {'statusCode': '200', 'addressCoordinate': exact[0].location};
                } else {
                    unknownAddresses = _.map(inexact, function (a) {
                        return a.toString();
                    });
                    console.log('in no match found');
                    json_responses = {'statusCode': '400', 'suggestedAddress': unknownAddresses};
                }
            }
            res.send(json_responses);
        });
    }

    module.exports.yourListings = function(req, res, next){
    	var json_response = '';
    	console.log("In your listings username "+ req.body.username);
    	mq_client.make_request("yourListings_queue", req.body, function (err, result) {

            if (err) {
                console.log(err);
                throw err;
            }
            else {
                console.log("what result is", result);
                if(result.code == '200'){
                	json_response = {'statusCode': result.code, 'listings': result.value};
                	res.send(json_response);
                }
                else{
                	json_response = {'statusCode': '201', 'message': 'You have no lisitngs at this time, would you like to become a host'};
                	res.send(json_response);
                }	
            }

        }); 
    }
    
    module.exports.deleteListing = function(req, res, next){
    	var json_response = '';
    	console.log("In delete listings username "+ req.body.id);
    	mq_client.make_request("deleteListing_queue", req.body, function (err, result) {

            if (err) {
                console.log(err);
                throw err;
            }
            else {
                console.log("what result is", result);
                if(result.code == '200'){
                	json_response = {'statusCode': '200'};
                	res.send(json_response);
                }else{
                	json_response = {'statusCode': '400'};
                	res.send(json_response);
                }
            }
        }); 
    }
    
    module.exports.pendingRequests = function(req, res, next){
    	var json_response = '';
    	console.log("HUM ayah par aa rahe hai");
    	console.log("In pending Requests username "+ req.user);
    	mq_client.make_request("pendingRequests_queue", {"email":req.user}, function (err, result) {

            if (err) {
                console.log(err);
                throw err;
            }
            else {
                console.log("what result is", result);
                if(result.code == '200'){
                	json_response = {'statusCode': result.code, 'requests':result.value};
                	console.log("What is correct json resposne",JSON.stringify(json_response));
                	res.send(json_response);
                }else{
                	json_response = {'statusCode': result.code};
                	res.send(json_response);
                }
            }
        }); 
    }
    
    module.exports.approveRequests = function(req, res, next){
    	var json_response = '';
    	console.log("In approve requests "+ req.body.tripId);
    	mq_client.make_request("approveRequests_queue", req.body, function (err, result) {

            if (err) {
                console.log(err);
                throw err;
            }
            else {
                console.log("what result is", result);
                if(result.code == '200'){
                	json_response = {'statusCode': result.code};
                	res.send(json_response);
                }else{
                	json_response = {'statusCode': result.code};
                	res.send(json_response);
                }
            }
        }); 
    }
    
    module.exports.rejectRequests = function(req, res, next){
    	var json_response = '';
    	console.log("In reject requests "+ req.body.tripId);
    	mq_client.make_request("rejectRequests_queue", req.body, function (err, result) {

            if (err) {
                console.log(err);
                throw err;
            }
            else {
                console.log("what result is", result);
                if(result.code == '200'){
                	json_response = {'statusCode': result.code};
                	res.send(json_response);
                }else{
                	json_response = {'statusCode': result.code};
                	res.send(json_response);
                }
            }
        }); 
    }
    
    module.exports.approvedRequests = function(req, res, next){
    	var json_response = '';
    	console.log("In approved Requests ");
    	var msg_payload = {"tripId":req.body.tripId, "checkInDate":req.body.checkInDate, "checkOutDate":req.body.checkOutDate, "loggedInEmail": req.user};
    	mq_client.make_request("approvedRequests_queue", req.body, function (err, result) {

            if (err) {
                console.log(err);
                throw err;
            }
            else {
                console.log("what result is", result);
                if(result.code == '200'){
                	json_response = {'statusCode': result.code, 'requests':result.value};
                	res.send(json_response);
                }else{
                	json_response = {'statusCode': result.code};
                	res.send(json_response);
                }
            }
        }); 
    }


module.exports.yourReservations = function(req, res, next){
    var json_response = '';
    console.log("In approved Requests "+ req.user);
    mq_client.make_request("yourReservations_queue", {"email":req.user}, function (err, result) {

        if (err) {
            console.log(err);
            throw err;
        }
        else {
            console.log("what result is", result);
            if(result.code == '200'){
                json_response = {'statusCode': result.code, 'requests':result.value};
                res.send(json_response);
            }else{
                json_response = {'statusCode': result.code};
                res.send(json_response);
            }
        }
    });
}


exports.newListing=newListing;