var Listing = require('../models/listing');

function getAllPlaces(msg, callback){

    var res = {};

    console.log("User Email Id:"+msg.userEmail);
    console.log("dst city  in Handle Req:" + msg.dstcity);
    var dstcity = msg.dstcity;


   Listing.find({hostId: { $ne: msg.userEmail },"city": dstcity,"auctionPrice": null},function(err,list) {

        if(err)
        {
            throw err;
        }

        else if(list){
            console.log("*********Fetched Properties for City**********");
            console.log(list);
            res.statusCode = "200";
            res.list = list;
            callback(null, res);
        }
        else
        {

            console.log("Properties cannot be fetched");
            res.statusCode = "401";
            callback(null, res);

        }

   });

}

function getAllAuctionableProperties(msg, callback){

    var res = {};


    console.log("dst city  in Handle Req:" + msg.dstcity);
    var dstcity = msg.dstcity;


    Listing.find({"city": dstcity, "fixedPrice":null},function(err,list) {

        if(err)
        {
            throw err;
        }

        else if(list){
            console.log("*********Fetched Properties for City**********");
            console.log(list);
            res.statusCode = "200";
            res.list = list;
            callback(null, res);
        }
        else
        {

            console.log("Properties cannot be fetched");
            res.statusCode = "401";
            callback(null, res);

        }

    });

}

function allCities(msg, callback){

    var res = {};


    // console.log("dst city  in Handle Req:" + msg.dstcity);
    // var dstcity = msg.dstcity;


    Listing.distinct("city",{"fixedPrice": null},function(err,auctionCity) {

        if(err)
        {
            throw err;
        }

        else if(auctionCity){
            console.log("*********Fetched  all the Cities data **********");
            console.log(auctionCity);
            res.statusCode = "200";
            res.auctionCity = auctionCity;

            Listing.distinct("city",{"auctionPrice": null},function(err,fixedCity) {



                if(err)
                {
                    throw err;
                }
                else
                {
                    if(fixedCity)
                    {
                        console.log(fixedCity);
                        res.fixedCity=fixedCity;
                        callback(null, res);

                    }

                }


            });


        }
        else
        {

            console.log("Properties cannot be fetched");
            res.statusCode = "401";
            callback(null, res);

        }

    });

}



exports.allCities=allCities;
exports.getAllPlaces = getAllPlaces;
exports.getAllAuctionableProperties=getAllAuctionableProperties;