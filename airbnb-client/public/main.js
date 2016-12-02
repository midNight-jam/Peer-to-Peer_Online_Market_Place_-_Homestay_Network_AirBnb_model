var dashboard =  angular.module('dashboard',[
  'ui.router',
    'ngMessages',
    'ngMaterial',
    'ngFileUpload',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'ngMap',
    'rzModule',
    'ngCookies'
]);

dashboard.config(function($stateProvider,$urlRouterProvider,$locationProvider)

{

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('landingPageAuctions', {
            url:'/landingPageAuctions',
            templateUrl: '/auctionableListings/landingPageAuctions.html',
            controller: 'landingPageAuctionsController',
            resolve: {
                isLoggedIn: function(auth,$state,$q,$location	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( !isUser){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else  {
                        console.log("I am in the error");
                        //
                        deferred.reject({authenticated:true});

                    }
                    return deferred.promise;

                }

            }

        })

        .state('auctionableListings', {
            url:'/auctionableListings',
            templateUrl: '/auctionableListings/auctionableListings.html',
            controller: 'auctionableListingsController',
            resolve: {
                data: function ($http) {
                    return $http({

                        method : "POST",
                        url: '/getAuctionableProperties',
                        data: {

                            "dstcity": localStorage.auctionCity

                        }
                    }).then(function (response) {
                        return response.data;
                    });
                }
            }
            // params : { listings : null}

        })


        .state('individualAuctionableListing', {
            url:'/individualAuctionableListing',
            templateUrl: '/auctionableListings/individualAuctionableListing.html',
            controller: 'individualAuctionableListingController',
            params : { "listing" : null}

        })

        .state('individualListing', {
            url:'/individualListing',
            templateUrl: '/individualListing/individualListing.html',
            controller: 'individualListingController',
            params : { "listing" : null},
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;

                }

            }

        })

        .state('bookTrip', {
            url:'/bookTrip',
            templateUrl: '/trips/bookTrip.html',
            controller: 'bookTripController',
            params : { "listing" : null, "checkInDate" : null, "checkOutDate" : null, "guestsSelected" : null},
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;

                }

            }

        })

        .state('showalllistings', {
            url:'/showlistings',
            templateUrl: '/showlistings/showalllistings.html',
            controller: 'showalllistingsController',
            resolve: {
                data: function ($http) {
                    return $http({

                        method : "POST",
                        url: '/getProperties',
                        data: {

                            "dstcity": localStorage.dstcity1

                        }
                    }).then(function (response) {
                        return response.data;
                    });
                },
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;

                }
            }


        })

        .state('yourTrips', {
            url:'/yourtrips',
            templateUrl: '/trips/yourtrips.html',
            controller: 'yourTripsController',
            onEnter: function(userTrack){
                console.log('about to enter the the yourTrips'+userTrack);
                userTrack.addChild('yourTrips', Date.now());
            },
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;

                }

            }

        })

        .state('dashboard',{
            url:'/dashboard',
            //params : { useremail : null},
            templateUrl:'/dashboard/dashboard.html',
            //controller : 'successLoginController',


        })

        .state('editProfile',{
        url:'/editProfile',
        templateUrl:'/editProfile/editProfile.html',
        controller : 'editProfileController',
        resolve: {
            isLoggedIn: function($http) {

                return $http.get('/isLoggedIn').success(function(response){

                    return response;
                }).error(function(err){

                    console.log(err);
                })
            }

        }
    })

        .state('viewProfile',{
            url:'/viewProfile',
            templateUrl:'/editProfile/viewProfile.html',
            controller : 'viewProfileController',
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;

                }

            }
        })

        .state('editPhotoAndVideo',{
            url:'/editPhotoAndVideo',
            templateUrl:'/editProfile/editPhotoAndVideo.html',
            controller : 'editPhotoAndVideoController',
            resolve: {
                isLoggedIn: function($http) {

                    return $http.get('/isLoggedIn').success(function(response){

                        return response;
                    }).error(function(err){

                        console.log(err);
                    })
                }

            }
        })

        .state('yourListings',{
            url:'/yourListings',
            //params : { useremail : null},
            templateUrl:'/yourListings/yourListings.html',
            controller : 'yourListingsController',
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;

                }

            }
        })
        
        .state('manageListings',{
            url:'/manageListings',
            //params : { useremail : null},
            templateUrl:'/yourListings/manageListings.html',
            controller : 'yourListingsController',
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;

                }

            }
        })
        
        .state('accountSettings',{
            url:'/accountSettings',
            //params : { useremail : null},
            templateUrl:'/accountSettings/accountSettings.html',
            controller : 'accountSettingsController',
            	resolve: {
                    isLoggedIn: function($http) {

                        return $http.get('/isLoggedIn').success(function(response){

                            return response;
                        }).error(function(err){

                            console.log(err);
                        })
                    }

                }
        })
        .state('transactionHistory',{
            url:'/transactionHistory',
            //params : { useremail : null},
            templateUrl:'/accountSettings/transactionHistory.html',
            controller : 'transactionHistoryController',
            	resolve: {
                    isLoggedIn: function($http) {

                        return $http.get('/isLoggedIn').success(function(response){

                            return response;
                        }).error(function(err){

                            console.log(err);
                        })
                    }

                }
        })
    $stateProvider.state('landingPage',{
        url:'/',
        templateUrl: "host/landingPage.html",
        controller :"landingPage",
        resolve: {
            isLoggedIn: function(auth,$state,$q,$location	) {

                var deferred =$q.defer();
                var isUser = auth.getUserInfo();
                console.log("Is user",isUser);
                if( !isUser){

                    console.log("getUserInfo", auth.getUserInfo());
                    deferred.resolve(auth.getUserInfo());
                }
                else  {
                    console.log("I am in the error");
                    //
                    deferred.reject({authenticated:true});

                }
                return deferred.promise;

            }

        }
    }).

    state('landingPage.afterSignIn',{
        url:'/profile',
        templateUrl: "host/afterSignIn.html",
        controller :"afterSignIn",
        resolve: {
            isLoggedIn: function(auth,$state,$q	) {

                var deferred =$q.defer();
                var isUser = auth.getUserInfo();
                console.log("Is user",isUser);
                if( isUser.data.user){

                    console.log("getUserInfo", auth.getUserInfo());
                    deferred.resolve(auth.getUserInfo());
                }
                else {
                    console.log("I am in the error");
                    deferred.reject({ authenticated: false });

                }
                return deferred.promise;

            }

        }
    }).
    state('host.login',{
        url:'/login',
        templateUrl: "host/login.html",
        controller :"login"
    }).state('host.signup',{
        url:'/signup',
        templateUrl: "host/signup.html",
        controller :"signup"
    }).state('host.presignup',{
        url:'/signup-options',
        templateUrl: "host/presignup.html",
        controller :"presignup"
    })

        .state('host',{
            url:'/host',
            templateUrl: "host/host.html",
            controller :"hostController"
        })
        .state('userHome',{
            url:'/userHome',
            templateUrl: "host/userHome.html",
            controller :"userHome",
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

					var deferred =$q.defer();
					var isUser = auth.getUserInfo();
					console.log("Is user",isUser);
							if( isUser.data.user){

								console.log("getUserInfo", auth.getUserInfo());
                                 deferred.resolve(auth.getUserInfo());
							}
							else {
								console.log("I am in the error");
                                deferred.reject({ authenticated: false });

							}
							return deferred.promise;

                }

            }

        })


        .state('hostingSteps',{
            url:'/hostingSteps',
            templateUrl: "host/hostingSteps.html",
            controller :"hostingStepsController",
            params:{user:null},
            onEnter: function(userTrack){
                console.log('about to enter the the hostDashBoards'+userTrack);
                userTrack.addChild('hostingSteps', Date.now());
            },
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;
                }

            }
        })
        .state('hostDashboard',{
            url:'/hostDashboard',
            templateUrl: "host/hostDashboard.html",
            controller :"hostDashboard",
            params:{user:null},
            onEnter: function(userTrack){
                console.log('about to enter the the hostDashBoards'+userTrack);
                userTrack.addChild('hostDashboard', Date.now());
            },
            resolve: {

                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;
                }


            }
        })


        .state('hostingSteps.step1',{
            url:'/step1',
            templateUrl: "host/hostingStep1.html",
            controller :"hostingStepsController",
            params:{place:null,user:null},
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;
                }
            }
        })
        .state('pendingRequest',{
            url:'/pendingRequest',
            templateUrl: "host/pendingRequest.html",
            controller :"pendingRequest",
            params:{place:null,user:null},
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;
                }
            }
        })
        .state('yourReservations',{
            url:'/yourReservations',
            templateUrl: "host/yourReservations.html",
            controller :"yourReservations",
            params:{place:null,user:null},
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;
                }
            }
        })
        .state('myReviews',{
            url:'/myReviews',
            templateUrl: "host/myReviews.html",
            controller :"myReviews",
            params:{place:null,user:null},
            resolve: {
                isLoggedIn: function(auth,$state,$q	) {

                    var deferred =$q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user",isUser);
                    if( isUser.data.user){

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({ authenticated: false });

                    }
                    return deferred.promise;
                }
            }
        })
        .state('hostingSteps.location',{
            url:'/location',
            templateUrl: "host/location.html",
            controller :"hostingStepLocationController",
            params:{place:null}
            // resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })


        .state('hostingSteps.amneties',{
            url:'/amneties',
            templateUrl: "host/amneties.html",
            controller :"hostingAmnetiesController",
            params:{place:null},
            // resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })



        .state('hostingSteps.spaces',{
            url:'/spaces',
            templateUrl: "host/spaces.html",
            controller :"hostingSpacesController",
            params:{place:null}
            // resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })




        .state('hostingSteps.description',{
            url:'/description',
            templateUrl: "host/description.html",
            controller :"hostingDescriptionController",
            params:{place:null}
            // resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })
        .state('hostingSteps.price',{
            url:'/price',
            templateUrl: "host/price.html",
            controller :"hostingPriceController",
            params:{place:null}
            // resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })

        .state('hostingSteps.upload',{
            url:'/upload',
            templateUrl: "host/upload.html",
            controller :"hostingUploadController",
            params:{listId:null}
            // resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })


    .state('previousTrips', {
    url: '/previoustrips',
    templateUrl: '/trips/previousTrips.html',
    controller: 'previousTripsController',
    resolve: {
            isLoggedIn: function(auth,$state,$q	) {

                var deferred =$q.defer();
                var isUser = auth.getUserInfo();
                console.log("Is user",isUser);
                if( isUser.data.user){

                    console.log("getUserInfo", auth.getUserInfo());
                    deferred.resolve(auth.getUserInfo());
                }
                else {
                    console.log("I am in the error");
                    deferred.reject({ authenticated: false });

                }
                return deferred.promise;

            }

        }
    })



    .state('auctionTrips', {
    url: '/auctionTrips',
    templateUrl: '/trips/auctionTrips.html',
        controller: 'auctionTripsController',
        resolve: {
            isLoggedIn: function(auth,$state,$q	) {

                var deferred =$q.defer();
                var isUser = auth.getUserInfo();
                console.log("Is user",isUser);
                if( isUser.data.user){

                    console.log("getUserInfo", auth.getUserInfo());
                    deferred.resolve(auth.getUserInfo());
                }
                else {
                    console.log("I am in the error");
                    deferred.reject({ authenticated: false });

                }
                return deferred.promise;

            }

        }
});



})

dashboard.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
        '<li ng-repeat="star in stars" ng-class="star">' +
        '\u2605' +
        '</li>' +
        '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});
dashboard.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}]);

