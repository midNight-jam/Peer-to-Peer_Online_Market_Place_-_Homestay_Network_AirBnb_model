#!/usr/bin/env node
var amqp = require('amqp')
, util = require('util'),
db = require('./models/db');

var user = require('./routes/user');
var host = require('./routes/host');
var logger = require('./routes/logger');
var analysis = require('./routes/analysis');
var admin = require('./routes/admin');
var places = require('./routes/places');
var trip = require('./routes/trip');
var reviews = require('./routes/reviews');
var payment = require('./routes/payment');

var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on login_queue");

	cnn.queue('login_queue', function(q){
		console.log("in the login queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the login queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			user.signin(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
	
	cnn.queue('signup_queue', function(q){
		console.log("in the signup_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the signup_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			user.signup(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
	
	cnn.queue('newListing_queue', function(q){
		console.log("in the newListing_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the newListing_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			host.newListing(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('uploadImage_queue', function(q){
		console.log("in the uploadImage_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the uploadImage_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			host.uploadImage(message, function(err,res){


                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });


	cnn.queue('activity_queue', function(q){
	console.log("in the activity_queue queue");
	q.subscribe(function(message, headers, deliveryInfo, m){
		console.log("in the activity_queue queue subcriber");
		console.log(logger.recordActivity);
		logger.recordActivity(message, function(err,res){
			cnn.publish(m.replyTo, res, {
				contentType:'application/json',
				contentEncoding:'utf-8',
				correlationId:m.correlationId
			});
		});
	});
});

	cnn.queue('track_queue', function(q){
		console.log("in the track_queue ");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the track_queue queue subcriber");
			logger.recordActivity(message, function(err,res){
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});



	cnn.queue('track_tree_queue', function(q){
		console.log("in the user_track");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the user_track queue subcriber");
			logger.userTrackTree(message, function(err,res){
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});




	cnn.queue('analysis_queue', function(q){
	console.log("in the analysis_queue ");
	q.subscribe(function(message, headers, deliveryInfo, m){
		console.log("in the activity_queue queue subcriber");
		analysis.getAllAnalysis(message, function(err,res){
			cnn.publish(m.replyTo, res, {
				contentType:'application/json',
				contentEncoding:'utf-8',
				correlationId:m.correlationId
			});
		});
	});
});

	cnn.queue('uploadProfileImage_queue', function(q){
			console.log("in the uploadProfileImage_queue queue");
			q.subscribe(function(message, headers, deliveryInfo, m){
					console.log("in the uploadProfileImage_queue queue subcriber");
					util.log(util.format( deliveryInfo.routingKey, message));
					util.log("Message: "+JSON.stringify(message));
					util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
					user.uploadProfileImage(message, function(err,res){

							//return index sent
							cnn.publish(m.replyTo, res, {
									contentType:'application/json',
									contentEncoding:'utf-8',
									correlationId:m.correlationId
							});
					});
			});
	});

	cnn.queue('userHome_queue', function(q){
			console.log("in the userHome_queue queue");
			q.subscribe(function(message, headers, deliveryInfo, m){
					console.log("in the userHome_queue queue subcriber");
					util.log(util.format( deliveryInfo.routingKey, message));
					util.log("Message: "+JSON.stringify(message));
					util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
					user.userHome(message, function(err,res){

							//return index sent
							cnn.publish(m.replyTo, res, {
									contentType:'application/json',
									contentEncoding:'utf-8',
									correlationId:m.correlationId
							});
					});
			});
	});

	cnn.queue('adminGetAllNewListing_queue', function(q){
		console.log("in the adminGetAllNewListing_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the adminGetAllNewListing_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.getAllPendingListings(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('setStatusForPendingListing_queue', function(q){
		console.log("in the setStatusForPendingListing_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the setStatusForPendingListing_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.setStatusForPendingListing(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('getAllApprovedListings_queue', function(q){
		console.log("in the getAllApprovedListings_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getAllApprovedListings_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.getAllApprovedListings(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('getAllRejectedListings_queue', function(q){
		console.log("in the getAllRejectedListings_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getAllRejectedListings_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.getAllRejectedListings(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('getAllUserDetails_queue', function(q){
		console.log("in the getAllUserDetails_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getAllUserDetails_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.getAllUserDetails(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('isLoggedIn_queue', function(q){
			console.log("in the isLoggedIn_queue queue");
			q.subscribe(function(message, headers, deliveryInfo, m){
					console.log("in the getAllUserDetails_queue queue subcriber");
					util.log(util.format( deliveryInfo.routingKey, message));
					util.log("Message: "+JSON.stringify(message));
					util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
					user.isLoggedIn(message, function(err,res){

							//return index sent
							cnn.publish(m.replyTo, res, {
									contentType:'application/json',
									contentEncoding:'utf-8',
									correlationId:m.correlationId
							});
					});
			});
	});


	cnn.queue('less_seen_areas', function(q){
	console.log("in the analysis_queue ");
	q.subscribe(function(message, headers, deliveryInfo, m){
		console.log("in the activity_queue queue subcriber");
		analysis.getLessSeenAreas(message, function(err,res){
			cnn.publish(m.replyTo, res, {
				contentType:'application/json',
				contentEncoding:'utf-8',
				correlationId:m.correlationId
			});
		});
	});
	});

  cnn.queue('reviews_on_properties', function(q){
    console.log("in the analysis_queue ");
    q.subscribe(function(message, headers, deliveryInfo, m){
      console.log("in the activity_queue queue subcriber");
      analysis.reviewsOnPorperties(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

  cnn.queue('top_revenue_properties', function(q){
    console.log("in the analysis_queue ");
    q.subscribe(function(message, headers, deliveryInfo, m){
      console.log("in the activity_queue queue subcriber");
      analysis.topRevenueProperties(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });


		cnn.queue('bidding_track_queue', function(q){
			console.log("in the bidding_track_queue ");
			q.subscribe(function(message, headers, deliveryInfo, m){
				console.log("in the activity_queue queue subcriber");
				analysis.biddingTrack(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			});
    
    cnn.queue('yourListings_queue', function(q){
        console.log("in the yourListings_queue queue");
        q.subscribe(function(message, headers, deliveryInfo, m){
            console.log("in the yourListings_queue queue subcriber");
            util.log(util.format( deliveryInfo.routingKey, message));
            util.log("Message: "+JSON.stringify(message));
            util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
            host.yourListings(message, function(err,res){

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });

    cnn.queue('deleteListing_queue', function(q){
        console.log("in the deleteListing_queue queue");
        q.subscribe(function(message, headers, deliveryInfo, m){
            console.log("in the deleteListing_queue queue subcriber");
            util.log(util.format( deliveryInfo.routingKey, message));
            util.log("Message: "+JSON.stringify(message));
            util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
            host.deleteListing(message, function(err,res){

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });
    

  });


  cnn.queue('citywise_revenue', function(q){
    console.log("in the analysis_queue ");
    q.subscribe(function(message, headers, deliveryInfo, m){
      console.log("in the activity_queue queue subcriber");
      analysis.citywiseRevenue(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });


  cnn.queue('top_revenue_host', function(q){
    console.log("in the analysis_queue ");
    q.subscribe(function(message, headers, deliveryInfo, m){
      console.log("in the activity_queue queue subcriber");
      analysis.topRevenueHosts(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });


  cnn.queue('user_track', function(q){
    console.log("in the user_track");
    q.subscribe(function(message, headers, deliveryInfo, m){
      console.log("in the user_track queue subcriber");
      analysis.userTrack(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });


	cnn.queue('getAllProperties_queue', function(q){
		console.log("in the getAllProperties_queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getAllProperties_queue  subcriber");
			places.getAllPlaces(message, function(err,res){
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

    cnn.queue('getAllAuctionableProperties_queue', function(q){
        console.log("in the getAllAuctionableProperties_queue");
        q.subscribe(function(message, headers, deliveryInfo, m){
            console.log("in the getAllAuctionableProperties_queue  subcriber");
            places.getAllAuctionableProperties(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });


  cnn.queue('user_group_track', function(q){
    console.log("in the user_track");
    q.subscribe(function(message, headers, deliveryInfo, m){
      console.log("in the user_track queue subcriber");
      analysis.userGroupTrack(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });


    cnn.queue('allCities_queue', function(q){
        console.log("in the allCities_queue");
        q.subscribe(function(message, headers, deliveryInfo, m){
            console.log("in the user_track queue subcriber");
            places.allCities(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });


	cnn.queue('bookTrip_queue', function(q){
		console.log("in the bookTrip_queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the bookTrip_queue queue subcriber");
			trip.bookTrip(message, function(err,res){
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});




	cnn.queue('checkDates_queue', function(q){
		console.log("in the checkDates_queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the checkDates_queue queue subcriber");
			trip.checkDates(message, function(err,res){
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
	
	cnn.queue('getProfile_queue', function(q){
		console.log("in the getProfile_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getProfile_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			user.getProfile(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
  
  cnn.queue('editProfile_queue', function(q){
		console.log("in the editProfile_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the editProfile_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			user.editProfile(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

  cnn.queue('paymentDetails_queue', function(q){
		console.log("in the paymentDetails_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the paymentDetails_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			user.paymentDetails(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
  
  cnn.queue('pendingRequests_queue', function(q){
		console.log("in the pendingRequests_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the pendingRequests_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			host.pendingRequests(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

  cnn.queue('approveRequests_queue', function(q){
		console.log("in the approveRequests_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the approveRequests_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			host.approveRequests(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

  cnn.queue('rejectRequests_queue', function(q){
		console.log("in the rejectRequests_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the rejectRequests_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			host.rejectRequests(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

  cnn.queue('approvedRequests_queue', function(q){
		console.log("in the approvedRequests_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the approvedRequests_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			host.approvedRequests(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

    cnn.queue('yourReservations_queue', function(q){
        console.log("in the yourReservations_queue queue");
        q.subscribe(function(message, headers, deliveryInfo, m){
            console.log("in the yourReservations_queue queue subcriber");
            util.log(util.format( deliveryInfo.routingKey, message));
            util.log("Message: "+JSON.stringify(message));
            util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
            host.yourReservations(message, function(err,res){
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });

  cnn.queue('reviewUser_queue', function(q){
		console.log("in the reviewUser_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the reviewUser_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			reviews.reviewUser(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

  cnn.queue('reviewList_queue', function(q){
		console.log("in the reviewList_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the reviewList_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			reviews.reviewList(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('getReviews_queue', function(q){
		console.log("in the getReviews_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getReviews_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			reviews.getReviews(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('getPendingTrips_queue', function(q){
		console.log("in the getPendingTrips_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getPendingTrips_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			trip.getPendingTrips(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('completedTripsForUser_queue', function(q){
		console.log("in the completedTripsForUser_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the completedTripsForUser_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			reviews.completedTripsForUser(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('completedTripsForHost_queue', function(q){
		console.log("in the completedTripsForHost_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the completedTripsForHost_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			reviews.completedTripsForHost(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	cnn.queue('getPreviousTrips_queue', function(q){
		console.log("in the getPreviousTrips_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getPreviousTrips_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			trip.getPreviousTrips(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('getAuctionTrips_queue', function(q){
		console.log("in the getAuctionTrips_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getAuctionTrips_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			trip.getAuctionTrips(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	  cnn.queue('updateTrip_queue', function(q){
		  console.log("in the updateTrip_queue queue");
		  q.subscribe(function(message, headers, deliveryInfo, m){
			  console.log("in the updateTrip_queue queue subcriber");
			  util.log(util.format( deliveryInfo.routingKey, message));
			  util.log("Message: "+JSON.stringify(message));
			  util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			  trip.updateTrip(message, function(err,res){
				  //return index sent
				  cnn.publish(m.replyTo, res, {
					  contentType:'application/json',
					  contentEncoding:'utf-8',
					  correlationId:m.correlationId
				  });
			  });
		  });
	  });



    cnn.queue('uploadProfileVideo_queue', function(q){
        console.log("in the uploadProfileVideo_queue queue");
        q.subscribe(function(message, headers, deliveryInfo, m){
            console.log("in the uploadProfileVideo_queue queue subcriber");
            util.log(util.format( deliveryInfo.routingKey, message));
            util.log("Message: "+JSON.stringify(message));
            util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
            user.uploadProfileVideo(message, function(err,res){
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    })

	cnn.queue('getUserRatings_queue', function(q){
		console.log("in the getUserRatings_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getUserRatings_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			analysis.userRatings(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	cnn.queue('getCardDetails_queue', function(q){
		console.log("in the getCardDetails_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getCardDetails_queue  subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			payment.getCardDetails(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('makePayment_queue', function(q){
		console.log("in the makePayment_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the makePayment_queue  subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			payment.makePayment(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('getAllHotsDetails_queue', function(q){
		console.log("in the getAllHotsDetails_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getAllHotsDetails_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.getAllHotsDetails(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	cnn.queue('getAllBillDetails_queue', function(q){
		console.log("in the getAllBillDetails_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getAllBillDetails_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.getAllBillDetails(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


		cnn.queue('total_revenue_queue', function(q){
			console.log("in the total_revenue_queue ");
			q.subscribe(function(message, headers, deliveryInfo, m){
				console.log("in the total_revenue_queue");
				util.log(util.format( deliveryInfo.routingKey, message));
				util.log("Message: "+JSON.stringify(message));
				util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
				admin.totalRevenue(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			});
		});


		cnn.queue('total_bookings_queue', function(q){
			console.log("in the total_revenue_queue ");
			q.subscribe(function(message, headers, deliveryInfo, m){
				console.log("in the total_revenue_queue");
				util.log(util.format( deliveryInfo.routingKey, message));
				util.log("Message: "+JSON.stringify(message));
				util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
				admin.totalBookings(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			});
		});




		cnn.queue('total_listings_queue', function(q){
			console.log("in the total_listings_queue");
			q.subscribe(function(message, headers, deliveryInfo, m){
				console.log("in the total_revenue_queue");
				util.log(util.format( deliveryInfo.routingKey, message));
				util.log("Message: "+JSON.stringify(message));
				util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
				admin.totalListings(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			});
		});


		cnn.queue('total_users_queue', function(q){
			console.log("in the total_listings_queue");
			q.subscribe(function(message, headers, deliveryInfo, m){
				console.log("in the total_revenue_queue");
				util.log(util.format( deliveryInfo.routingKey, message));
				util.log("Message: "+JSON.stringify(message));
				util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
				admin.totalUsers(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			});
		});



	});
  
  cnn.queue('getPaymentDetails_queue', function(q){
		console.log("in the getPaymentDetails_queue queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the getPaymentDetails_queue queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			user.getPaymentDetails(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});




	cnn.queue('cancelTrip_queue', function(q){
		console.log("in the cancelTrip queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("in the cancelTrip queue subcriber");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			trip.cancelTrip(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});



});//End of On Ready Function




