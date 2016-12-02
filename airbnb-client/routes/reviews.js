var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.get('/completedTripsForHost', function(req,res,next){
	var json_response = '';
	var msg_payload = {'loggedInEmail': req.user};
	mq_client.make_request("completedTripsForHost_queue", msg_payload, function(err, result){
		if(err){
			console.log(err);
			throw err;
		}else{
			console.log("what result is", result);
            if(result.code == '200'){
            	json_response = {'statusCode': '200', 'value': result.value};
            	res.send(json_response);
            }
            else{
            	json_response = {'statusCode': '400', 'message': 'Something went wrong'};
            	res.send(json_response);
            }
		}
	});
});

router.get('/completedTripsForUser', function(req,res,next){
	var json_response = '';
	var msg_payload = {'loggedInEmail': req.user};
	mq_client.make_request("completedTripsForUser_queue", msg_payload, function(err, result){
		if(err){
			console.log(err);
			throw err;
		}else{
			console.log("what result is", result);
            if(result.code == '200'){
            	json_response = {'statusCode': '200', 'value': result.value};
            	res.send(json_response);
            }
            else{
            	json_response = {'statusCode': '400', 'message': 'Something went wrong'};
            	res.send(json_response);
            }
		}
	});
});

router.post('/reviewUser', function(req,res,next){
	var json_response = '';
	console.log("In reviewUser ");
	var msg_payload = {'userEmail': req.body.email, 'feedback': req.body.feedback, 'rate': req.body.rate , 'loggedInEmail': req.user, 'hostPic': req.body.hostPic, 'userPic': req.body.userPic};
	mq_client.make_request("reviewUser_queue", msg_payload, function(err, result){
        if(err){
            console.log(err);
            throw err;
        }
        else{
            console.log("what result is", result);
            if(result.code == '200'){
            	json_response = {'statusCode': '200'};
            	res.send(json_response);
            }
            else{
            	json_response = {'statusCode': '400', 'message': 'Something went wrong'};
            	res.send(json_response);
            }	
        }
    });
});

router.post('/reviewList', function(req,res,next){
	var json_response = '';
	var msg_payload = {'listId': req.body.listId, 'feedback': req.body.feedback, 'ratings': req.body.rate, 'loggedInEmail': req.user, 'profilePic': req.body.reviewerPic};
	mq_client.make_request("reviewList_queue", msg_payload, function(err, result){
		if(err){
			console.log(err);
			throw err;
		}else{
			console.log("what result is", result);
            if(result.code == '200'){
            	json_response = {'statusCode': '200'};
            	res.send(json_response);
            }
            else{
            	json_response = {'statusCode': '400', 'message': 'Something went wrong'};
            	res.send(json_response);
            }
		}
	});
});

router.post('/reviewForHost', function(req,res,next){
    var json_response = '';
    var msg_payload = {'listId': req.body.listId, 'feedback': req.body.feedback, 'ratings': req.body.rate, 'hostEmail': req.body.hostId,'userEmail':req.user};
    mq_client.make_request("reviewForHost_queue", msg_payload, function(err, result){
        if(err){
            console.log(err);
            throw err;
        }else{
            console.log("what result is", result);
            if(result.code == '200'){
                json_response = {'statusCode': '200'};
                res.send(json_response);
            }
            else{
                json_response = {'statusCode': '400', 'message': 'Something went wrong'};
                res.send(json_response);
            }
        }
    });
});

router.post('/getReviews', function(req,res,next){
	var json_response = '';
	var msg_payload = {'user': req.user};
	mq_client.make_request("getReviews_queue", msg_payload, function(err, result){
		if(err){
			console.log(err);
			throw err;
		}else{
			console.log("what result is", result);
            if(result.code == '200'){
            	json_response = {'statusCode': '200', 'value': result.value};
            	res.send(json_response);
            }
            else{
            	json_response = {'statusCode': '400', 'message': 'Something went wrong'};
            	res.send(json_response);
            }
		}
	});
});

module.exports = router;