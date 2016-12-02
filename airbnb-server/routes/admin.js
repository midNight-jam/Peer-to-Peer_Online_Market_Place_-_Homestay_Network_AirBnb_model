/**
 * Created by Gaurang on 16-11-2016.
 */

var User = require('../models/user');
var Listing = require('../models/listing');
var userProfile = require('../models/userProfile');
var mysql = require('../db/mysql.js');
var date = require('../models/date');

console.log("I am in the user");

function getAllPendingListings(req ,callback)
{
    console.log("Get All pending listings ",req);

    Listing.find({
        "status":"newListing"
    },function(err,newListings){
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log(newListings);
            return callback(null ,newListings);
        }
    })

}

function setStatusForPendingListing(req ,callback)
{
    console.log("Get All pending listings ",req);

    var listId = req.pendingListing.listId
    var status = req.status;
    //({phone:request.phone}, {$set: { phone: request.phone }}
    Listing.update({"listId":listId},{$set:{"status":status}}
    ,function(err){

        if(err) {
            return callback(err);
        }
        else {
            console.log("For ListId "+listId +" Status update to: "+status);

            return callback(null,{"listId":listId});
        }
    });
}


function getAllApprovedListings(req ,callback)
{
    console.log("Get All pending listings ",req);

    Listing.find({
        "status":"approved"
    },function(err,ApprovedListings){
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log(ApprovedListings);
            return callback(null ,ApprovedListings);
        }
    })

}

function getAllRejectedListings(req ,callback)
{
    console.log("Get All pending listings ",req);

    Listing.find({
        "status":"rejected"
    },function(err,RejectedListings){
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log(RejectedListings);
            return callback(null ,RejectedListings);
        }
    })

}

function getAllUserDetails(req ,callback){
    console.log("Get All userProfiles listings ",req);

    userProfile.find({
    },function(err,userProfiles){
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log(userProfiles);
            return callback(null ,userProfiles);
        }
    })
}
function getUserTripsInfo(req ,callback){

}
function getUsersPropertyInfo(req ,callback){

}
function getAllHotsDetails(req ,callback){
    console.log("Get All hostProfiles listings ",req);

    userProfile.find({'host':true},function(err,hostProfiles){
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log(hostProfiles);
            return callback(null ,hostProfiles);
        }
    })
}

//change this method body
function getAllBillDetails(req ,callback){
    console.log("Get All bills ",req);
    var allBills= "select * from trips;";

    mysql.getData(function(err,allTrips){

        if(err){
            console.log("Error in Trips MySQL:"+err);
            return callback(null ,{"error":"mysql Error"} );
            //throw err;
        }

        else
        {
            return callback(null ,allTrips);
        }
    },allBills);
}

function totalRevenue(req ,callback){
  console.log("Get All bills ",req);
  var totalRevenue= "SELECT (SELECT SUM(totalPrice) FROM trips) + (SELECT SUM(totalPrice) FROM auctiontrips) as revenue;";

  mysql.getData(function(err,revenue){

    if(err){
      console.log("Error in Trips MySQL:"+err);
      return callback(null ,{"error":"mysql Error"} );
      //throw err;
    }

    else
    {
      return callback(null ,revenue);
    }
  },totalRevenue);
}

//


function totalBookings(req ,callback){
  console.log("Get All bills ",req);
  var totalBookings= "SELECT (SELECT Count(*) FROM trips) + (SELECT Count(*) FROM auctiontrips) as bookings;";

  mysql.getData(function(err,bookings){

    if(err){
      console.log("Error in Trips MySQL:"+err);
      return callback(null ,{"error":"mysql Error"} );
      //throw err;
    }

    else
    {
      return callback(null ,bookings);
    }
  },totalBookings);
}


function totalListings(req ,callback){

  Listing.count({},function(err,count){
    if(err)
    {
      return callback(err);
    }
    else
    {
      console.log('Count fo lisdsldilasd'+count);
      return callback(null ,{listings:count});
    }
  });
}


function totalUsers(req ,callback){

  User.count({},function(err,count){
    if(err)
    {
      return callback(err);
    }
    else
    {
      console.log('Count fo lisdsldilasd'+count);
      return callback(null ,{users:count});
    }
  });
}


exports.getAllPendingListings=getAllPendingListings;
exports.setStatusForPendingListing= setStatusForPendingListing;
exports.getAllApprovedListings = getAllApprovedListings;
exports.getAllRejectedListings = getAllRejectedListings;

exports.getAllUserDetails =getAllUserDetails;
exports.getUserTripsInfo = getUserTripsInfo;
exports.getUsersPropertyInfo = getUsersPropertyInfo;
exports.getAllHotsDetails= getAllHotsDetails;
exports.getAllBillDetails = getAllBillDetails;
exports.totalRevenue= totalRevenue;
exports.totalBookings= totalBookings;
exports.totalListings= totalListings;
exports.totalUsers= totalUsers;