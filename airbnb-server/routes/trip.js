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

        console.log("SuiteNum"+msg.suiteNum);
        console.log("Host Name"+msg.hostName);
        console.log("Zip Code"+msg.zipCode);
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
            "guestsSelected":msg.guestsSelected,
            "hostName":msg.hostName,
            "listingTitle":msg.listingTitle,
            "listingCity": msg.listingCity,
            "userName":msg.userName,
            "zipCode":msg.zipCode,
            "streetAddress":msg.streetAddress,
            "suiteNum":msg.suiteNum,
            "hostProfilePic":msg.hostProfilePic,
            "userProfilePic":msg.userProfilePic
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


function checkDates(msg, callback){

    var res = {};

    console.log("in checkDates function");
    console.log("listId  in Handle Req:"+msg.listId);
    console.log(" checkin: "+msg.checkInDate);
    console.log(" checkin: "+msg.checkOutDate);
console.log("User Email"+msg.userEmail)

    //Check if dates are available for the selected property
    /*   //ALL Statuses in trips tables
     pendingHostApproval = when approval is pending from host
     rejectedByHost = when host rejects the request
     approvedByHost = when host has accepted bu trip is yet to be taken
     tripCompleted = when trip is completed
     tripCancelledbyUser = when booking user cancels the trip
     */
    //OR (userName='"+msg.userEmail+"' and tripStatus='pendingHostApproval')";
//Check if user has already booked this porperty for the same date

    var checkuser ="SELECT tripId,checkInDate,checkOutDate FROM trips WHERE listId='"+ msg.listId + "' and userEmail='"+msg.userEmail+"' and ((checkInDate <= '"+msg.checkInDate+"'AND checkOutDate >= '"+msg.checkInDate+"') OR (checkInDate < '"+msg.checkOutDate+"' AND checkOutDate >= '"+msg.checkOutDate+"' ) OR ('"+msg.checkInDate+"' <= checkInDate AND '"+msg.checkOutDate+"' >= checkInDate))";

    var checkdate= "SELECT tripId,checkInDate,checkOutDate FROM trips WHERE listId='"+ msg.listId + "'  and (tripStatus='tripCompleted' OR tripStatus='approvedByHost') and ((checkInDate <= '"+msg.checkInDate+"'AND checkOutDate >= '"+msg.checkInDate+"') OR (checkInDate < '"+msg.checkOutDate+"' AND checkOutDate >= '"+msg.checkOutDate+"' ) OR ('"+msg.checkInDate+"' <= checkInDate AND '"+msg.checkOutDate+"' >= checkInDate))";


    mysql.getData(function(err,results){


        if(err){
            console.log("Error in Trips MySQL:"+err);

            //throw err;
        }

        else
        {
            if(results.length>0){

                console.log("You Already have booked property for these dates");
                console.log("Results: " + results);
                res.bookedDates=results;
                res.statusCode="405";
                callback(null, res);


            }
            else

            {
                mysql.getData(function(err,results){


                    if(err){
                        console.log("Error in Trips MySQL:"+err);

                        //throw err;
                    }

                    else
                    {
                        if(results.length>0){

                            console.log("Dates already booked");
                            console.log("Results: " + results);
                            res.bookedDates=results;
                            res.statusCode="401";
                            callback(null, res);


                        }
                        else

                        {
                            console.log("Dates Available");
                            res.statusCode = "200";
                            callback(null, res);

                        }
                    }
                },checkdate);


            }
        }
    },checkuser);









/*
    var checkdate= "SELECT tripId,checkInDate,checkOutDate FROM trips WHERE listId='"+ msg.listId + "' and userEmail='"+msg.userEmail+"' and (tripStatus='tripCompleted' OR tripStatus='approvedByHost') and ((checkInDate <= '"+msg.checkInDate+"'AND checkOutDate >= '"+msg.checkInDate+"') OR (checkInDate < '"+msg.checkOutDate+"' AND checkOutDate >= '"+msg.checkOutDate+"' ) OR ('"+msg.checkInDate+"' <= checkInDate AND '"+msg.checkOutDate+"' >= checkInDate))";
*/


       /* mysql.getData(function(err,results){


            if(err){
                console.log("Error in Trips MySQL:"+err);

                //throw err;
            }

            else
            {
                if(results.length>0){

                    console.log("Dates already booked");
                    console.log("Results: " + results);
                    res.bookedDates=results;
                    res.statusCode="401";
                    callback(null, res);


                }
                else

                {
                    console.log("Dates Available");
                    res.statusCode = "200";
                    callback(null, res);

                }
            }
        },checkdate);
*/


}//End of function check Dates



function getPendingTrips(msg, callback){

    var res = {};

    console.log("in getPendingTrips function");
    console.log("listId  in Handle Req:"+msg.userEmail);


    /*   //ALL Statuses in trips tables
     pendingHostApproval = when approval is pending from host
     rejectedByHost = when host rejects the request
     approvedByHost = when host has accepted bu trip is yet to be taken
     tripCompleted = when trip is completed
     tripCancelledbyUser = when booking user cancels the trip
     */


    var getTrips= "SELECT * FROM trips WHERE userEmail ='"+msg.userEmail+"' AND (tripStatus = 'pendingHostApproval' OR  tripStatus = 'approvedByHost')";

    mysql.getData(function(err,results){


        if(err){
            console.log("Error in getting pending Trips MySQL:"+err);

            //throw err;
        }

        else
        {
            if(results.length>0){

                checkTripCompleted();
                console.log("Fetched Pending Trips");
                console.log("Results: " + results);
                res.pendingTrips=results;
                res.statusCode="200";
                callback(null, res);


            }
            else

            {
                checkTripCompleted();
                console.log("No Trips Available for user");
                res.statusCode = "401";
                callback(null, res);

            }
        }
    },getTrips);



}//End of function getPendingTrips

function getPreviousTrips(msg, callback){

    var res = {};

    console.log("in getPendingTrips function");
    console.log("listId  in Handle Req:"+msg.userEmail);


    /*   //ALL Statuses in trips tables
     pendingHostApproval = when approval is pending from host
     rejectedByHost = when host rejects the request
     approvedByHost = when host has accepted bu trip is yet to be taken
     tripCompleted = when trip is completed
     tripCancelledbyUser = when booking user cancels the trip
     */


    var getTrips= "SELECT * FROM trips WHERE userEmail ='"+msg.userEmail+"' AND (tripStatus = 'rejectedByHost' OR  tripStatus = 'tripCompleted' OR  tripStatus = 'tripCancelledbyUser')";

    mysql.getData(function(err,results){


        if(err){
            console.log("Error in getting pending Trips MySQL:"+err);

            //throw err;
        }

        else
        {
            if(results.length>0){

                console.log("Fetched Pending Trips");
                console.log("Results: " + results);
                res.pendingTrips=results;
                res.statusCode="200";
                callback(null, res);


            }
            else

            {
                console.log("No Trips Available for user");
                res.statusCode = "401";
                callback(null, res);

            }
        }
    },getTrips);



}//End of function getPreviousTrips


function getAuctionTrips(msg, callback){

    var res = {};

    console.log("in getPendingTrips function");
    console.log("listId  in Handle Req:"+msg.userEmail);


    /*   //ALL Statuses in trips tables
     pendingHostApproval = when approval is pending from host
     rejectedByHost = when host rejects the request
     approvedByHost = when host has accepted bu trip is yet to be taken
     tripCompleted = when trip is completed
     tripCancelledbyUser = when booking user cancels the trip
     */


    var getTrips= "SELECT * FROM trips WHERE userEmail ='"+msg.userEmail+"' AND (tripStatus = 'pendingHostApproval' OR  tripStatus = 'approvedByHost')";

    mysql.getData(function(err,results){


        if(err){
            console.log("Error in getting pending Trips MySQL:"+err);

            //throw err;
        }

        else
        {
            if(results.length>0){

                console.log("Fetched Pending Trips");
                console.log("Results: " + results);
                res.pendingTrips=results;
                res.statusCode="200";
                callback(null, res);


            }
            else

            {
                console.log("No Trips Available for user");
                res.statusCode = "401";
                callback(null, res);

            }
        }
    },getTrips);



}//End of function getAuctionTrips




//Function for checking if trip is completed
function checkTripCompleted(){



    console.log("in checkTripCompleted");



    /*   //ALL Statuses in trips tables
     pendingHostApproval = when approval is pending from host
     rejectedByHost = when host rejects the request
     approvedByHost = when host has accepted bu trip is yet to be taken
     tripCompleted = when trip is completed
     tripCancelledbyUser = when booking user cancels the trip
     */

    var currentDate = new Date();
    console.log("Current Date:"+currentDate);
    var formatdate = currentDate.toISOString().split('T')[0];
    console.log(formatdate);


    var checkTrips= "UPDATE trips SET tripStatus = 'tripCompleted' WHERE checkOutDate <'"+formatdate+"' AND paymentStatus ='paid'";


    mysql.getData(function(err,results){


        if(err){
            console.log("Error in updating  Trips  completed status.MySQL:"+err);

            //throw err;
        }

        else
        {
            if(results.length>0){

                console.log("updated trip completed status");
                console.log("Results: " + results);



            }
            else

            {
                console.log("No Trips are completed");


            }
        }
    },checkTrips);



}//End of function


//Function for updateTrip
function updateTrip(msg, callback){

    var res={};


    console.log("in updateTrip");
    console.log("tripId:"+msg.tripId);
    console.log("checkin:"+msg.checkInDate);
    console.log("checkout:"+msg.checkOutDate);


    var checkindate = new Date(msg.checkInDate);
    var checkInDate = checkindate.toISOString().split('T')[0];
    console.log("checkInDate:"+checkInDate);
    var checkoutdate = new Date(msg.checkOutDate);
    var checkOutDate = checkoutdate.toISOString().split('T')[0];
    console.log("formated checkout"+checkOutDate);


/*
    var checkTrips= "UPDATE trips SET tripStatus = 'pendingHostApproval' WHERE checkOutDate <'"+formatdate+"' AND paymentStatus ='paid'";
*/


    var updateTrips= "UPDATE trips SET tripStatus = 'pendingHostApproval',checkOutDate='"+checkOutDate+"',checkInDate='"+checkInDate+"' WHERE tripID ='"+msg.tripId+"'";

    mysql.getData(function(err,results){


        if(err){
            console.log("Error in updating  Trips  completed status.MySQL:"+err);

            //throw err;
        }

        else
        {
            if(results.affectedRows>0){

                console.log("updated trip completed status");
                var result ={"Results ":results};
                console.log(result);
                res.statusCode=200;
                callback(null,res);

            }
            else

            {
                console.log("Cannot upate the trip");
                res.statusCode=401;
                callback(null,res);


            }
        }
    },updateTrips);



}//End of function update trip



function cancelTrip(msg, callback){

    var res={};


    console.log("in cancelTrip");
    console.log("tripId:"+msg.tripId);
    console.log("checkin:"+msg.user);


    var cancelTrips= "UPDATE trips SET tripStatus ='tripCancelledbyUser',paymentStatus='cancelled' WHERE tripID ='"+msg.tripId+"'";

    mysql.getData(function(err,results){


        if(err){
            console.log("Error in updating  Trips  completed status.MySQL:"+err);

            //throw err;
        }

        else
        {
            if(results.affectedRows>0){

                console.log("trip cancelled");
                var result ={"Results ":results};
                console.log(result);
                res.statusCode=200;
                callback(null,res);

            }
            else

            {
                console.log("cannot cancel the trip");
                res.statusCode=401;
                callback(null,res);


            }
        }
    },cancelTrips);



}//End of function cancel trip


exports.bookTrip=bookTrip;
exports.checkDates=checkDates;
exports.getPendingTrips = getPendingTrips;
exports.getPreviousTrips=getPreviousTrips;
exports.getAuctionTrips = getAuctionTrips;
exports.updateTrip=updateTrip;
exports.cancelTrip=cancelTrip;
