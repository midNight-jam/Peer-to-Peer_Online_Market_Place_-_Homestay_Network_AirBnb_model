var mysql = require('../db/mysql.js');
var ssn = require('ssn');

function bookTrip(msg, callback){

    var res = {};

    console.log("in booktrip function");
    console.log("hostemail  in Handle Req:"+msg.hostEmail);
    console.log("Selected Guests: "+msg.guestsSelected);


    /*   //ALL Statuses in trips tables
     pendingHostApproval = when approval is pending from host
     rejectedByHost = when host rejects the request
     approvedByHost = when host has accepted bu trip is yet to be taken
     tripCompleted = when trip is completed
     tripCancelledbyUser = when booking user cancels the trip
     */




    var tripIdandbillId = ssn.generate();

    console.log("Trip Id:" + tripIdandbillId);

    checkTripID(); //Call  for checking if trip id is not in use






    //Check if trip id already in use
    function checkTripID()
    {


        var checkId = "select tripId from trips where tripId = '"+tripIdandbillId+"'";
      //  var getOrders="select * from orderhistory where emailid='"+email+"'";
        mysql.getData(function(err,results){


            if(err){
                console.log("Error in Trips MySQL:"+err);

                //throw err;
            }

            else
            {
                if(results.length>0){

                    console.log("Trip Id alread in Use");
                    console.log("Results: " + results);
                    tripIdandbillId = ssn.generate();
                    checkTripID();
                }
                else

                {
                    console.log("Trip Id Available");
                    insertIntoTrip();
                }
            }
        },checkId);

    }








    //will Execute only when trip Id is unique
    function insertIntoTrip ()
    {

        var booktrip = "INSERT INTO trips SET ?";

        var tripData = {

            "tripId": tripIdandbillId,
            "userEmail":msg.userEmail,
            "hostEmail":msg.hostEmail,
            "listId":msg.listId,
            "fixedPrice":msg.fixedPrice,
            "totalPrice":msg.totalPrice,
            "checkInDate":msg.checkInDate,
            "checkOutDate":msg.checkOutDate,
            "tripStatus":"pendingHostApproval",
            "paymentStatus":"pending",
            "billId":tripIdandbillId,
            "userComments":msg.userComments,
            "guestsSelected":msg.guestsSelected
        };

        mysql.putData(function(err,results){


            if(err){
                console.log("Error in Trips MySQL:"+err);

                //throw err;
            }

            else
            {
                if(results!== undefined){

                    console.log("New Trip stored into database");
                    console.log("Results: " + results);
                    res.statusCode = "200";
                    callback(null, res);

                }
                else

                {

                    console.log("Cannot store Items into Database");
                    res.statusCode="401";
                    callback(null, res);

                }
            }
        },booktrip,tripData);


    }


}//End of function book trip

exports.bookTrip=bookTrip;

