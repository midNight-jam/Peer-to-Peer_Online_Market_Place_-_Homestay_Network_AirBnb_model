/**
 * Created by kunal on 11/20/16.
 */
var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.post('/getProperties' ,function(req,res,next) {



    console.log("********In Search Places Routes*********");

    var dstcity = req.body.dstcity;
    console.log("User Email:" +req.user);
    console.log("Dest City : " + dstcity);





        var msg_payload = {

            "dstcity": dstcity,
            "userEmail":req.user


        };

        mq_client.make_request('getAllProperties_queue',msg_payload, function(err,results){

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

                    console.log("Fetched Properties from Database");

                    console.log("Results: " + results);
                    console.log("List of properties"+results.list);

                    json_responses = {"statusCode" : 200,"properties":results.list } ;
                    console.log(json_responses);
                    res.send(json_responses);

                }
                else if(results.statusCode == 401)
                {
                    console.log("Cannot store Items into Cart");

                    json_responses = {"statusCode" : 401 };
                    console.log(json_responses);
                    res.send(json_responses);


                }

            }
        });













})

router.post('/getAuctionableProperties' ,function(req,res,next) {



    console.log("********In Search Places Routes*********");

    var dstcity = req.body.dstcity;
    console.log("Dest City : " + dstcity);





    var msg_payload = {

        "dstcity": dstcity


    };

    mq_client.make_request('getAllAuctionableProperties_queue',msg_payload, function(err,results){

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

                console.log("Fetched Properties from Database");

                console.log("Results: " + results);
                console.log("List of properties"+results.list);

                json_responses = {"statusCode" : 200,"properties":results.list } ;
                console.log(json_responses);
                res.send(json_responses);

            }
            else if(results.statusCode == 401)
            {
                console.log("Cannot store Items into Cart");

                json_responses = {"statusCode" : 401 };
                console.log(json_responses);
                res.send(json_responses);


            }

        }
    });

})


router.get('/allCities' ,function(req,res,next) {

    mq_client.make_request('allCities_queue',null, function(err,results){

        console.log("In all Cities router");
        if(err)
        {
            console.log(err);
            json_responses = {"statusCode" : 405} ;
            res.send(json_responses);
        }
        else
        {
            res.send(results);
        }


    });

})

module.exports = router;
