var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.post('/getCardDetails' ,function(req,res,next) {


    console.log("********In getCardDetails*********");


    console.log("User Email:" + req.user);

if(req.user)
{
    var msg_payload = {

        "userEmail": req.user


    };

    mq_client.make_request('getCardDetails_queue', msg_payload, function (err, results) {

        if (err) {
            console.log(err);
            json_responses = {"statusCode": 405};
            res.send(json_responses);

        }
        else {

            console.log(results);

            if (results.statusCode == 200) {

                console.log("Fetched Card Details ");
                console.log("Results: " + results);
                json_responses = {"statusCode": 200, "cardDetails": results.cardDetails};
                console.log(json_responses);
                res.send(json_responses);

            }
        }
    })
}
else{
    console.log("not logged in");
}

});

    router.post('/makePayment' ,function(req,res,next) {

        console.log("********In make payment*********");
        console.log("User Email:" +req.user);
        console.log("tripId: "+ req.body.tripId);
        console.log("Card Number:"+req.body.cardNumber);

/*
        if(expiryMonth < Number(currDate.getMonth()-1)){
            $scope.message = 'Please choose an expriy date greater than or equal to today!';
        }else if(cvv.length != 3){
            $scope.message = 'CVV should be 3 digit!';
        }*/


        var msg_payload = {

            "userEmail": req.user,
            "tripId":req.body.tripId,
            "cardNumber":req.body.cardNumber
        };

        mq_client.make_request('makePayment_queue',msg_payload, function(err,results){

            if(err){
                console.log(err);
                json_responses = {"statusCode" : 405} ;
                res.send(json_responses);

            }
            else
            {

                console.log(results);

                if(results.statusCode == 200)

                {
                    console.log("Payment Done ");

                    json_responses = {"statusCode" : 200} ;
                    console.log(json_responses);
                    res.send(json_responses);
                }
                else{
                    console.log("Payment cannot be made");
                    json_responses = {"statusCode" : 401} ;
                    console.log(json_responses);
                    res.send(json_responses);
                }
            }
        })

    });

    module.exports = router;
