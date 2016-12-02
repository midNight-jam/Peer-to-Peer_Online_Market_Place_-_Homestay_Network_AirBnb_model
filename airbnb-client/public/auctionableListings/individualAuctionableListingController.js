/**
 * http://usejsdoc.org/
 */
dashboard.controller("individualAuctionableListingController", function($scope,$filter,$http ,$state,$stateParams){

    console.log("reached trips controller");
    $scope.disableDates = true;
    $scope.showBill = false;

    //$scope.listingDetails = $stateParams.listing;

    /*$scope.x = { "eachListing" : $cookieStore.get('eachListing')};
     console.log("Cookies eachListing:"+$scope.x);*/


    //$scope.listingDetails = $scope.x.eachListing;

    if (typeof(Storage) !== "undefined") {
        $scope.listingDetails=JSON.parse(localStorage.eachListing);
        console.log("$scope.listingDetails"+ $scope.listingDetails);

    } else {
        $scope.listingDetails = $stateParams.listing;
    }



    $scope.availableFrom = new Date($scope.listingDetails.fromDate).toISOString().split('T')[0];
    $scope.availableTo = new Date($scope.listingDetails.toDate).toISOString().split('T')[0];

    $scope.listingUrl = $scope.listingDetails.listingImages[0][0];

    $scope.profilePic = $scope.listingDetails.hostProfilePic;

    $scope.listingReviewsNumber = 10;

    $scope.hostName = $scope.listingDetails.hostName;

    $scope.noOfBedroom = 2;

    $scope.listId = $scope.listingDetails.listId;

    console.log("List iD: " + $scope.listId);

    $scope.noOfBedroom = 2;

    $scope.noOfGuests = $scope.listingDetails.guestAllowed;

    $scope.noOfReviews = 3;

    $scope.clientProfilePic = '/individualListing/2.jpg';

    $scope.clientName = "Denis";

    $scope.clientComment = "A great apartment in a great location. The metro was very close and you were not far from Romes major attractions. The apartment was spacious, wifi worked perfectly and there were plenty of places to eat and shop nearby. Claudio was helpfull and reliable.";

    $scope.noGuests = [];

    for(var i = 1 ; i <= $scope.noOfGuests ; i++ ){
        $scope.noGuests.push(i);
    }

    $scope.ratings =
        {
            current: 3,
            max: 5
        };

    $scope.myInterval = 4000;
    $scope.noWrapSlides = false;
    $scope.active = 0;

    $scope.slides = [];
    //Fetching URL for Images
    var image = {};
    for(j=0;j<$scope.listingDetails.listingImages[0].length;j++)
    {
        console.log("Images for prop"+$scope.listingDetails.listingImages[0][j]);
        image = {
            image: $scope.listingDetails.listingImages[0][j],
            id:j
        };
        $scope.slides.push(image);
    }

    $scope.checkOutDate = new Date($scope.listingDetails.toDate);
    $scope.checkInDate = new Date($scope.listingDetails.fromDate);

    $scope.calcBill = function () {

        if($scope.guestsSelected  == undefined){
            $(".bookTripDiv").css({"height":"200px"});
        }

        else{
            $(".bookTripDiv").css({"height":"375px"});
            var timeDiff = Math.abs($scope.checkOutDate.getTime() - $scope.checkInDate.getTime());
            $scope.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            $scope.totalPrice =  ($scope.listingDetails.auctionPrice * $scope.diffDays);
            $scope.datesNotAvailable = false;
            $scope.showBill = true;
        }
    };

    $scope.bidForListing = function(){

        //Removing Time Stamp From CheckIn/Out Dates
        if($scope.guestsSelected  == undefined){
            $scope.datesNotAvailable = true;
            $scope.msgdates = "Please select number of Guests";
            return;
        }

        else if($scope.bidAmount  == undefined){
            $scope.datesNotAvailable = true;
            $scope.msgdates = "Please Enter your Bid";
            return;
        }

        else if($scope.bidAmount  < $scope.totalPrice){
            $scope.datesNotAvailable = true;
            $scope.msgdates = "Bid should be more than Minimum Bid Amount";
            return;
        }

        else{

            $http({

                method : "POST",
                url: '/postBid',
                data: {


                    "listingDetails": $scope.listingDetails,
                    "bidAmount": $scope.bidAmount,
                    "totalPrice": $scope.totalPrice


                }
            }).success(function(data)

            {
                console.log("Status Code " + data.statusCode);
                if(data.statusCode==200)
                {
                    console.log("Dates Available");
                    console.log(data);

                    localStorage.setItem("listing", JSON.stringify($scope.listingDetails));
                    localStorage.setItem("checkInDate", JSON.stringify($scope.checkInDate));
                    localStorage.setItem("checkOutDate", JSON.stringify($scope.checkOutDate));
                    localStorage.setItem("guestsSelected", JSON.stringify($scope.guestsSelected));




                    $state.go("bookTrip");



                }
                else
                {

                    console.log("Dates Not Available");
                    var bookedDates = data.bookedDates;
                    console.log(bookedDates);
                    $scope.datesNotAvailable = true;
                    $scope.msgdates = "Property already booked for the selected dates";

                }


            })

        }
    }
});