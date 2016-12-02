var Listing = require('../models/listing');
var User = require('../models/userProfile');
var date = require('../models/date');
var ssn = require('ssn');
var mysql = require('../db/mysql');

function newListing(req ,callback)
{
	console.log("Checking the newListing ",req);

    var newList = new Listing();
    newList.hostId=req.hostId	;
    newList.status="newListing";
    newList.overAllRating=0;
    newList.listId=ssn.generate();
    newList.address=req.address;
    newList.latitude = req.latitude;
    newList.longitude = req.longitude;
    newList.city=req.address.city;
    newList.basicAmneties=req.amneties.basicAmneties;
    newList.safetyAmneties=req.amneties.safetyAmneties;
    newList.auctionPrice=req.auctionPrice;
    newList.fromDate=req.availableFromDate;
    newList.toDate=req.availableTillDate;
    newList.description=req.description.description;
    newList.title=req.description.title;
    newList.auctionPrice=req.auctionPrice;
    newList.fixedPrice=req.fixedPrice;
    newList.roomType=req.room;
    newList.facilities=req.spaces;
    newList.bathCount=req.bathCount;
    newList.guestAllowed=req.guest;
    newList.created_at=date.getDate();
	User.findOne({"email":req.hostId},function(err,result){

		if(err)
		{
			throw err;
		}
		else {

			console.log("getting the profile pic",JSON.stringify(result))
			newList.hostProfilePic =result.profileImages;
			newList.hostName =result.firstname;
            newList.save(function(err)
                {if(err)
                {
                    console.log(err);
                }
                else
                {
                    User.update({"email":req.hostId},{"host":true,$push:{"myListing":newList.listId} },function(err,result){


                        if(err)
                            throw err;
                        else
                        {
                            callback(null,{"listId":newList.listId});
                        }

                    });

                }
                }
            );
		}

	});



}


function uploadImage(req,callback)
{

console.log("In the uploadImage queue");
Listing.update({"listId":req.listId},{$push:{listingImages:req.imageLink}},function(err,result){

	if(err)
	{
		throw err;
	}
	else
	{
		return callback(null,{"msg":"uploaded"});	}


});
}

function yourListings(req,callback){
	console.log('In your listings queue' + req.username);
	Listing.find({"hostId": req.username}, function(err, result){
		if(err){
			throw err;
		}else{
			console.log(result);
			if(result.length > 0){
				callback(null, {'code': '200', 'value': result});
			}else{
				callback(null, {'code': '201'});
			}
		}
	});
}

function deleteListing(req,callback){
	console.log('In delete listings queue' + req.id);
	Listing.update({"_id": req.id}, { $set: {"status": "Unlisted"} }, function(err, result){
		if(err){
			throw err;
		}else{
			if(result != ""){
				callback(null, {'code': '200'});
			}
		}
	});
}

function pendingRequests(req,callback){
	console.log('In pending requests queue' + req.email);
	var pendingQuery = "select * from trips where tripStatus = 'pendingHostApproval' AND hostEmail = '"+req.email+"'";
	 mysql.getData(function(err,results){
         if(err){
             console.log("Error in Trips MySQL:"+err);
             //throw err;
         }
         else
         {
             if(results.length>0){
                 console.log("Results: " + JSON.stringify(results));
                 callback(null, {'code': '200', 'value': results});
             }
             else
             {
                 callback(null, {'code': '200'});
             }
         }
     },pendingQuery);
}

function approveRequests(req,callback){
	console.log('In pending requests queue' + req.email);
	var approveQuery = "update trips set tripStatus = 'approvedByHost' where tripId ='"+req.tripId+"'";
	var rejectQuery = "update trips set tripStatus = 'rejectedByHost' where hostEmail = '"+ req.loggedInEmail +"' AND (checkInDate BETWEEN 'CAST(" + req.checkInDate + " AS datetime)' AND 'CAST(" + req.checkOutDate + " AS datetime)') AND (checkOutDate BETWEEN 'CAST(" + req.checkInDate + " AS datetime)' AND 'CAST(" + req.checkOutDate + " AS datetime)')"; 
	 mysql.getData(function(err,results){
         if(err){
             console.log("Error in Trips MySQL:"+err);
             //throw err;
         }
         else
         {
             if(results != ''){
                 
                 mysql.getData(function (err,res){
                	 if(err){
                		 throw err;
                	 }else{
                		 console.log("Inside result "+res);
                		 if(res != ''){
                             callback(null, {'code': '200'});
                		 }else{
                             callback(null, {'code': '400'});
                		 }
                	 }
                 },rejectQuery);
             }
             else
             {
                 callback(null, {'code': '400'});
             }
         }
     },approveQuery);
}

function rejectRequests(req,callback){
	console.log('In pending requests queue' + req.email);
	var rejectQuery = "update trips set tripStatus = 'rejectedByHost' where tripId ='"+req.tripId+"'";
	 mysql.getData(function(err,results){
         if(err){
             console.log("Error in Trips MySQL:"+err);
             //throw err;
         }
         else
         {
             if(results != ''){
                 console.log("Results: " + results);
                 callback(null, {'code': '200'});
             }
             else
             {
                 callback(null, {'code': '400'});
             }
         }
     },rejectQuery);
}

function approvedRequests(req,callback){
	console.log('In approved requests queue' + req.email);
	var approvedQuery = "select * from trips where tripStatus = 'approvedByHost' AND hostEmail = '"+req.email+"'";
	 mysql.getData(function(err,results){
         if(err){
             console.log("Error in Trips MySQL:"+err);
             //throw err;
         }
         else
         {
             if(results.length>0){
                 console.log("Results: " + results);
                 callback(null, {'code': '200', 'value': results});
             }
             else
             {
                 callback(null, {'code': '400'});
             }
         }
     },approvedQuery);
}

function yourReservations(req,callback){
    console.log('In approved requests queue' + req.email);
    var approvedQuery = "select * from trips where  hostEmail = '"+req.email+"'";
    mysql.getData(function(err,results){
        if(err){
            console.log("Error in Trips MySQL:"+err);
            //throw err;
        }
        else
        {
            if(results.length>0){
                console.log("Results: " + results);
                callback(null, {'code': '200', 'value': results});
            }
            else
            {
                callback(null, {'code': '400'});
            }
        }
    },approvedQuery);
}




exports.yourReservations=yourReservations;
exports.uploadImage=uploadImage;
exports.newListing=newListing;
exports.yourListings = yourListings;
exports.deleteListing = deleteListing;
exports.pendingRequests = pendingRequests;
exports.approveRequests = approveRequests;
exports.rejectRequests = rejectRequests;
exports.approvedRequests = approvedRequests;