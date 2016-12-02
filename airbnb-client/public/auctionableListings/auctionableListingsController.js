/**
 * Created by kunal on 11/20/16.
 * Modified by Prateek on 11/21/2016
 */

dashboard.controller("auctionableListingsController", function(data,$scope,$http ,$state,NgMap,$rootScope, $timeout,$uibModal,$stateParams,$cookies,$cookieStore){

    console.log("reached listings controller");
    console.log("Properties in controller " + $scope.properties);


    //$scope.properties =  $stateParams.listings;

    $scope.properties =  data.properties;

    /*//$cookieStore.put('properties', $stateParams.listings);

     $scope.x = { "properties" : $cookieStore.get('properties')};
     console.log("Cookies X:"+$scope.x);
     $scope.properties = $scope.x.properties;
     console.log("Cookies Properties:"+$scope.properties);*/


    console.log("Number of Properties:"+$scope.properties.length);

    if($scope.properties.length!=0) {
        $scope.city = $scope.properties[0].address[0].city;
        $scope.noOfListings = $scope.properties.length;
        $scope.mapLatitude = $scope.properties[0].latitude;
        $scope.mapLongitude = $scope.properties[0].longitude;
    }

    else{
        $scope.nolistings=true;
        $scope.msg = " No listings found for this city"


    }




    //Sliding Range Bar

    $scope.myEndListener = function(sliderId) {
        console.log(sliderId);
        console.log(sliderId, 'has ended with ', $scope.minRangeSlider.minValue);
        console.log(sliderId, 'has ended with ', $scope.minRangeSlider.maxValue);


    };


    $scope.minRangeSlider = {
        minValue: 20,
        maxValue: 1000,
        options: {
            floor: 30,
            ceil: 1000,
            step: 10,
            id: 'sliderA',
            onEnd: $scope.myEndListener
        }
    };

    //  Google Map listings prices on maps

    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });


    $scope.showproperty = function(e,p){

        $scope.p = p;
        $scope.showInfoWindow('bar', p._id);
        $scope.limage = p.listingImages[0][0];
        console.log("Image URL:"+$scope.limage);
    };



// Made by Prateek
//  All listings page

    $scope.ratingApt =
        {
            current: 3,
            max: 5
        };

    $scope.noOfGuests = 3;

    // To Display Carousel of images
    $scope.myInterval = 4000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var currIndex = 0;

    $scope.slides = [];
    var eachListingSlides = [];
    //Fetching URL for Images
    var image = {};
    for (i=0;i<$scope.properties.length;i++)
    {
        eachListingSlides = [];
        for(j=0;j<$scope.properties[i].listingImages[0].length;j++)
        {
            console.log("Images for prop"+$scope.properties[i].listingImages[0][j]);
            image = {
                image: $scope.properties[i].listingImages[0][j],
                id:j
            };
            eachListingSlides.push(image);
        }
        $scope.slides.push(eachListingSlides);
    }

    // Function to switch state to individual listing
    $scope.displayListing = function(listing){


        /*$cookieStore.put('eachListing', listing);
         $scope.x = { "eachListing" : $cookieStore.get('eachListing')};
         console.log("Cookies eachListing:"+$scope.x);*/

        //$state.go("individualListing");
        localStorage.setItem("eachListing", JSON.stringify(listing));


        $state.go("individualAuctionableListing", {"listing" : listing})
    }


});