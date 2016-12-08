var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var expressSession = require('express-session');
var passport = require('passport');
var routes = require('./routes/index');
var auth = require('./routes/auth');
var user = require('./routes/user');
var host = require('./routes/host');
var activityRecorder = require('./routes/activityRecorder');
var admin = require('./routes/admin');
var places = require('./routes/places');
var review = require('./routes/reviews');
var payment = require('./routes/payment');

var userProfile = require('./routes/userProfile');

var trip = require('./routes/trip');


var redis = require('redis');
var redisStore = require('connect-redis')(expressSession);
var client = redis.createClient('6379','127.0.0.1'); //creates a new client
console.log('redis on:127.0.0.1:6379 ');
/*client.on('connect', function() {
    console.log('connected to redis.');
});*/

/*redis test*/
/*client.set('framework', 'Redis for Airbnb.', function(err, reply) {
    console.log(reply);
});

client.get('framework', function(err, reply) {
    console.log(reply);
});*/
/*---End Test-*/


var fs= require('fs');
var AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var mq_client = require('./rpc/client');

var imageColl =[];
var listReviewImages=[];
var uploadMyVideo;
//var imageProfileColl=[];

var mongoStore = require("connect-mongo")(expressSession);

var mongoSessionConnectURL = "mongodb://localhost:27017/airbnb";



var app = express();
var db = require('./models/db');
require('./routes/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//express-session 
/*
app.use(expressSession({
  secret: 'cmpe273_teststring',
  resave: false,  //don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  duration: 30 * 60 * 1000,    
  activeDuration: 5 * 60 * 1000,
  store: new mongoStore({
    url: mongoSessionConnectURL
  })
}));*/

//express-session
app.use(expressSession({
    secret: 'cmpe273_teststring',
    saveUninitialized: false,
    resave: false,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




AWS.config = new AWS.Config();
AWS.config.accessKeyId = "";
AWS.config.secretAccessKey = "";
AWS.config.region = "us-west-2";
AWS.config.apiVersions = {
   "s3": "2006-03-01"
};


var s3 = new AWS.S3({ /* ... */ });
var upload = multer({
storage: multerS3({
s3: s3,
bucket: 'cmpe273airbnb',
contentType: multerS3.AUTO_CONTENT_TYPE,
acl: 'public-read',
metadata: function (req, file, cb) {
 console.log("file object",file);
 cb(null, {fieldName: file.originalname});
},
key: function (req, file, cb) {
 console.log("WHat is the fieldname",file.originalname);
 console.log("length of file ",req.file);

 imageColl.push("https://s3.amazonaws.com/cmpe273airbnb/"+file.originalname+""+Date.now().toString()+"roomPhoto");
 cb(null,file.originalname+""+Date.now().toString()+"roomPhoto" );
}
})
});

var uploadProfilePic = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cmpe273airbnb',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            console.log("file object",file);
            cb(null, {fieldName: file.originalname});
        },
        key: function (req, file, cb) {
            console.log("WHat is the fieldname",file.originalname);
            console.log("length of file ",req.file);
            imageProfileColl=[];
            imageProfileColl.push("https://s3.amazonaws.com/cmpe273airbnb/"+file.originalname+""+Date.now().toString());
            cb(null,file.originalname+""+Date.now().toString() );
        }
    })
});

var uploadReview = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cmpe273airbnb',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            console.log("file object",file);
            cb(null, {fieldName: file.originalname});
        },
        key: function (req, file, cb) {
            console.log("WHat is the fieldname",file.originalname);
            console.log("length of file ",req.file);
            listReviewImages=[];
            listReviewImages.push("https://s3.amazonaws.com/cmpe273airbnb/"+file.originalname+""+Date.now().toString());
            cb(null,file.originalname+""+Date.now().toString() );
        }
    })
});

var uploadProfileVideo = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cmpe273airbnb',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            console.log("file object",file);
            cb(null, {fieldName: file.originalname});
        },
        key: function (req, file, cb) {
            console.log("WHat is the fieldname",file.originalname);
            console.log("length of file ",req.file);

            uploadMyVideo="https://s3.amazonaws.com/cmpe273airbnb/"+file.originalname+""+Date.now().toString();
            cb(null,file.originalname+""+Date.now().toString() );
        }
    })
});


app.use('/', routes);
app.post('/login',auth.signin);
app.post('/signup',auth.signup);
app.get('/isLoggedIn',auth.isLoggedIn);
app.post('/newListing',host.newListing);
app.get('/userHome',user.userHome);
app.post('/activity',activityRecorder.record);
app.post('/track',activityRecorder.track);
app.post('/trackTree',activityRecorder.trackTree);
app.get('/logout',auth.logout);

app.post('/addressValidator', host.addressValidator);
app.post('/yourListings', host.yourListings);
app.post('/deleteListing', host.deleteListing);

app.get('/admin',admin.redirectToAdmin);
app.post('/adminGetAllNewListing',admin.adminGetAllNewListing);
app.post('/setStatusForPendingListing',admin.setStatusForPendingListing);

app.post('/adminGetAllApprovedListings',admin.adminGetAllApprovedListings);
app.post('/adminGetAllRejectedListings',admin.adminGetAllRejectedListings);
app.post('/adminGetAllUserDetails',admin.adminGetAllUserDetails);
app.get('/adminGetAllAnalytics',admin.adminGetAllAnalytics);
app.get('/adminGetLessSeenAreas',admin.adminGetLessSeenAreas);
app.get('/adminReviewsOnProperties',admin.adminReviewsOnProperties);
app.get('/adminTopTenRevenueProperties',admin.adminTopTenRevenueProperties);
app.get('/adminCityWiseRevenue',admin.adminCityWiseRevenue);
app.get('/adminTopTenRevenueHost',admin.adminTopTenRevenueHost);
app.post('/getUserGroupTrack',admin.getUserGroupTrack);
app.post('/getHostRatings',admin.getHostRatings);
app.post('/adminGetAllHostDetails',admin.adminGetAllHostDetails);
app.get('/adminGetAllBillDetails',admin.adminGetAllBillDetails);
app.post('/adminBiddingTrack',admin.adminBiddingTrack);
app.get('/totalRevenue',admin.totalRevenue);
app.get('/totalBokings',admin.totalBokings);
app.get('/totalListings',admin.totalListings);
app.get('/totalUsers',admin.totalUsers);



app.post('/getProperties',places);
app.get('/allCities',places);

app.post('/adminGetAllHostDetailsWithRedis',admin.adminGetAllHostDetailsWithRedis);//redis


app.post('/getAuctionableProperties', places);
app.post('/postBid', trip);

app.post('/checkDates',trip);
app.post('/bookTrip',trip);
app.post('/getPendingTrips',trip);
app.post('/getPreviousTrips',trip);
app.post('/getAuctionTrips',trip);
app.post('/updateTrip',trip);
app.post('/cancelTrip',trip);

app.post('/getCardDetails',payment);
app.post('/makePayment',payment);

app.get('/userProfile', userProfile);
app.post('/editProfile', userProfile);
app.post('/paymentDetails', userProfile);
app.get('/getPaymentDetails', userProfile);
app.post('/pendingRequests', host.pendingRequests);
app.post('/approveRequests', host.approveRequests);
app.post('/rejectRequests', host.rejectRequests);
app.post('/approvedRequests', host.approvedRequests);
app.post('/yourReservations', host.yourReservations);

app.post('/reviewUser', review);
app.post('/reviewList', review);
app.post('/getReviews', review);
app.get('/completedTripsForHost', review);
app.get('/completedTripsForUser', review);

app.post('/uploadProfileVideo',uploadProfileVideo.any(),function (req,res,next) {

    console.log("Video uploaded successfully");

    mq_client.make_request("uploadProfileVideo_queue",{"user":req.body.user,"videoLink":uploadMyVideo},function(err,result){

        if(err)
        {
            console.log(err);
            throw err;
        }
        else
        {
            uploadMyVideo ="";
            console.log("what rresult is",result);
            res.send(result.msg);
        }
    });

})
app.post('/upload',  upload.any(),function (req, res, next) {

console.log("IMAGE COLLECTION ",JSON.stringify(imageColl));
    console.log(req.file);
    console.log(req.body);

      mq_client.make_request("uploadImage_queue",{"listId":req.body.listId.listId,"imageLink":imageColl},function(err,result){

    if(err)
    {
      console.log(err);
      throw err;
    }
    else
    {
        imageColl =[];
      console.log("what rresult is",result);
      res.send(result.msg);
    }
  });
});


app.post('/uploadProfilePic',  uploadProfilePic.any(),function (req, res, next) {
    mq_client.make_request("uploadProfileImage_queue",{"user":req.body.user,"imageLink":imageProfileColl},function(err,result){
        if(err)
        {
            console.log(err);
            throw err;
        }
        else
        {    imageProfileColl=[];
            console.log("what rresult is",result);
            res.send(result.msg);
        }
    });
});




app.post('/uploadReview',  uploadReview.any(),function (req, res, next) {
    var json_response = '';
    var msg_payload = {'listId': req.body.listId, 'feedback': req.body.feedback, 'ratings': req.body.rate, 'loggedInEmail': req.user, 'profilePic': req.body.reviewerPic,'listReviewImages':listReviewImages};
    mq_client.make_request("reviewList_queue", msg_payload, function(err, result){
        if(err){
            console.log(err);
            throw err;
        }else{
            console.log("what result is", result);
            if(result.code == '200'){
                json_response = {'statusCode': '200'};
                listReviewImages=[];
                res.send(json_response);
            }
            else{
                json_response = {'statusCode': '400', 'message': 'Something went wrong'};
                listReviewImages=[];
                res.send(json_response);
            }
        }
    });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


function exitHandler(options, err) {
    if (options.cleanup){
        console.log('Clean Redis');

        client.del('hostList');

    }

}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));



module.exports = app;
