/**
 * Created by jayam on 11/18/16.
 */
var mongo = require('../db/mongodb.js');
var mongoURL = "mongodb://localhost:27017/airbnb";
var mysql = require('../db/mysql.js');
var Listing = require('../models/listing');

function getAllAnalysis(message ,callback)
{
  console.log("fetching anaylsis document");

  mongo.connect(mongoURL, function(){
    console.log('Connected to mongo at: ' + mongoURL);
    var coll = mongo.collection('analysis');

    coll.find({}).toArray(function (err, results) {
      if (err) {
        console.log('An error - ', err);
        callback(err, null);
      }
      else {
        console.log(results);
        results = results[0];
        callback(null, results);
      }
    });
  });
}


function getLessSeenAreas(req ,callback)
{
  console.log("Get Less Seen areas",req);
  var zipCodes = [];

  mongo.connect(mongoURL, function(){
    console.log('Connected to mongo at: ' + mongoURL);
    var coll = mongo.collection('analysis');

    coll.find({}).toArray(function (err, results) {
      if (err) {
        console.log('An error - ', err);
        callback(err, null);
      }
      else {

        //////// GET al Areas///////

        Listing.find({},{"address.ZipCode":1},function(err,list) {

          if(err)
          {
            throw err;
          }

          else if(list){
            console.log("*********Fetched Properties for City**********");
            console.log(JSON.stringify(list));
            list.forEach(function (listing) {
              console.log(listing.address[0].ZipCode);
              zipCodes.push(listing.address[0].ZipCode);
            });


            results = results[0];
            var lessSeenArea = results.areaClick;

            var lessSeenAreaData = [];
            var lessSeenZipCodes= [];
            areas = Object.keys(lessSeenArea);
            areas.forEach(function (area) {
              var obj = {};
              obj.area = area;
              obj.seen = lessSeenArea[area];
              lessSeenAreaData.push(obj);
              lessSeenZipCodes.push(area);
            });




            lessSeenZipCodes.forEach(function (zp) {
              console.log('Sip code '+zp);
            });


            var FINALARRAY = [];

            zipCodes.forEach(function (mysqlZp) {
              var index = lessSeenZipCodes.indexOf(mysqlZp);
              if(index===-1){
                var obj = {};
               // obj.area = area;
                obj.area = mysqlZp;
                obj.seen = 0;
                lessSeenAreaData.push(obj);
              }
            });

            function compare(a,b) {
              if (a.seen< b.seen)
                return -1;
              if (a.seen > b.seen)
                return 1;
              return 0;
            }

            lessSeenAreaData.sort(compare);

            var finalLessSeenAreas = {};
            var areasToShow = 0;
            var leastAreasT0Show = 5;

            lessSeenAreaData.forEach(function (ar) {
              if(areasToShow < leastAreasT0Show ){
                finalLessSeenAreas[ar.area] = ar.seen;
              }
              areasToShow++;
            });


            return callback(null ,lessSeenAreaData);

          }
          else
          {
            console.log("Properties cannot be fetched");
          }
        });
      }
    });
  });

}


function reviewsOnPorperties(req ,callback)
{
  console.log("review on Porteries ",req);

  // read reivew on properties
  // Listing.find({
  //   "status":"rejected"
  // },function(err,RejectedListings){
  //   if(err)
  //   {
  //     return callback(err);
  //   }
  //   else
  //   {
  //     console.log(RejectedListings);
  //     return callback(null ,RejectedListings);
  //   }

  reviewOnProperties = {
    'San Jose':54,
    'West Julian':31,
    'MLK Library':80,
    '2nd Street':63,
    'James Street':82
  };
  return callback(null ,reviewOnProperties);
}

function topRevenueProperties(req ,callback)
{

var top10RevenueProperties = "select  t.listingTitle, SUM(t.totalPrice) as Revenue  from trips as t  group by t.listingTitle order by sum(t.totalPrice) LIMIT 10;";

  mysql.getData(function(err,results){

    if(err){
      console.log("Error in Trips MySQL:"+err);
      return callback(null ,{"error":"mysql Error"} );
      //throw err;
    }

    else
    {

      var top10Properties = {};
      results.forEach(function (property) {
        // shall change this to listings Name below
        top10Properties[property.listingTitle] = property.Revenue;
      });

      return callback(null ,top10Properties );
    }
  },top10RevenueProperties);
}


function citywiseRevenue(req ,callback)
{

  var citywiseRevenue = "select  t.listingCity, SUM(t.totalPrice) as Revenue  from trips as t  group by t.listingCity order by sum(t.totalPrice);"

  mysql.getData(function(err,results){

    if(err){
      console.log("Error in Trips MySQL:"+err);
      return callback(null ,{"error":"mysql Error"} );
      //throw err;
    }

    else
    {
      var cityRevenues = {};
      results.forEach(function (property) {
        // shall change this to listings Name below
        cityRevenues[property.listingCity] = property.Revenue;
      });

      return callback(null ,cityRevenues );
    }
  },citywiseRevenue);

}


function topRevenueHosts(req ,callback)
{

  var top10RevenueHost =
    "SELECT t.hostEmail, SUM(t.totalPrice) as listingRevenue, SUM(auct.totalPrice) as biddingRevenue  FROM trips as t, auctiontrips auct   WHERE t.hostEmail = auct.hostEmail  AND DATE_FORMAT(t.checkInDate, '%Y-%m-%d') BETWEEN '2016-11-1' AND '2016-12-31'  AND DATE_FORMAT(auct.checkInDate, '%Y-%m-%d') BETWEEN '2016-11-1' AND '2016-12-31'  group by t.hostEmail LIMIT 10;";


  mysql.getData(function(err,results){

    if(err){
      console.log("Error in Trips MySQL:"+err);
      return callback(null ,{"error":"mysql Error"} );
      //throw err;
    }

    else
    {
      var users = {};
      console.log('results are ... '+results);
      results.forEach(function (list) {
        console.log('....  '+JSON.stringify(list));
        users[list.hostEmail] = [list.listingRevenue,list.biddingRevenue];
      });

      console.log('users ....  '+JSON.stringify(users));

      return callback(null ,users );
    }
  },top10RevenueHost);

}


function userGroupTrack(req ,callback) {
  mongo.connect(mongoURL, function () {
    var coll = mongo.collection('analysis');

    coll.find({}).toArray(function (err, results) {
      if (err) {
        console.log('An error - ', err);
        callback(err, null);
      }
      else {
        res = results[0].userTrack;
        var areaGroupTrack = {};
        var allTracks = results[0].userTrack;
        var usersTrack = Object.keys(allTracks);

        usersTrack.forEach(function (user) {
          if (allTracks[user].area === req.area) {
            var singleUserTrack = allTracks[user];
            var singleUserTrackKeys = Object.keys(singleUserTrack);

            singleUserTrackKeys.forEach(function (sut) {
              if (areaGroupTrack[sut]) {
                if (areaGroupTrack[sut] !== allTracks[user][sut]) { // to avaoid adding area key again
                  areaGroupTrack[sut] += allTracks[user][sut];
                }
              }
              else {
                areaGroupTrack[sut] = allTracks[user][sut];
              }
            })
          }
        });
        callback(null, areaGroupTrack);
      }
    });
  });
}


function biddingTrack(req ,callback) {

  var allBids = "select  * from auctiontrips ";
  var bidsGroupedByLisiting = {};

  mysql.getData(function(err,rows){

    if(err){
      console.log("Error in Trips MySQL:"+err);
      return callback(null ,{"error":"mysql Error"} );
      //throw err;
    }

    else
    {

      rows.forEach(function (row) {
        if(bidsGroupedByLisiting[row.listingTitle]=== undefined){
          bidsGroupedByLisiting[row.listingTitle] = [row.bidPrice];
        }
        else{
          bidsGroupedByLisiting[row.listingTitle].push(row.bidPrice);
        }
      });

      return callback(null ,bidsGroupedByLisiting);
    }
  },allBids);
}

function userRatings(req,callback) {

  //get HostEmail

  var hostid = req.email;

  mongo.connect(mongoURL, function () {
    console.log('Connected to mongo at: ' + mongoURL);
    var coll = mongo.collection('listings');

    var userLimit = 5;
    coll.find({"hostId": hostid},{_id:0,title:1,"review.ratings.overall":1}).limit(userLimit).toArray(function (err, results) {
      if (err) {
        console.log('An error - ', err);
        callback(err, null);
      }
      else {
        console.log(JSON.stringify(results));

        var propertyTuple = {};
        results.forEach(function (prop) {
          console.log('propppp ' + JSON.stringify(prop));

          var reveiws = prop.review;
          var reviewsSummed = {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0
          };
          reveiws.forEach(function (rev) {
              reviewsSummed[rev.ratings.overall]++;
          });

          //reviewsSummed = Object.values(reviewsSummed);
          propertyTuple[prop.title] = reviewsSummed;

        });
        callback(null, propertyTuple);
      }
    });

  });
}

exports.getAllAnalysis=getAllAnalysis;
exports.getLessSeenAreas=getLessSeenAreas;
exports.reviewsOnPorperties=reviewsOnPorperties;
exports.topRevenueProperties=topRevenueProperties;
exports.citywiseRevenue=citywiseRevenue;
exports.topRevenueHosts=topRevenueHosts;
exports.userGroupTrack=userGroupTrack;
exports.biddingTrack=biddingTrack;
exports.biddingTrack=biddingTrack;
exports.userRatings = userRatings;
