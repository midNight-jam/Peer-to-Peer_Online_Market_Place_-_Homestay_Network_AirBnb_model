/**
 * http://usejsdoc.org/
 */
dashboard.controller("bookTripController", function($scope,$http ,$state,$stateParams,isLoggedIn,auth)
{

    console.log("reached booktrip controller");
    $scope.loggedIn=true;
    console.log(isLoggedIn);

    $scope.profilePic=isLoggedIn.data.user.profilePic;

    $scope.host=isLoggedIn.data.user.host;
    console.log(auth.getUserInfo());

    $scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";


    $scope.userName = isLoggedIn.data.user.email;

    $scope.userFirstName=isLoggedIn.data.user.firstname;


    if (typeof(Storage) !== "undefined") {
        $scope.listing=JSON.parse(localStorage.listing);
        $scope.checkindateuf=JSON.parse(localStorage.checkInDate);
        $scope.checkoutdateuf=JSON.parse(localStorage.checkOutDate);
        $scope.guestsSelected=JSON.parse(localStorage.guestsSelected);
        $scope.totalPrice=JSON.parse(localStorage.totalPrice);
      //  console.log("$scope.listingDetails"+ $scope.guestsSelected);

    }
    else
        {

            $scope.listing = $stateParams.listing;
            $scope.checkindateuf=$stateParams.checkInDate;
            $scope.checkoutdateuf=$stateParams.checkOutDate;
            $scope.guestsSelected=$stateParams.guestsSelected;
            $scope.totalPrice=$stateParams.totalPrice;

        }





    var checkindate = new Date($scope.checkindateuf);
    console.log("checkindateuf"+checkindate);
    $scope.checkInDate = checkindate.getFullYear() + '-' + (checkindate.getMonth() + 1) + '-' + checkindate.getDate();

    var checkoutdate = new Date($scope.checkoutdateuf);
    $scope.checkOutDate=checkoutdate.getFullYear() + '-' + (checkoutdate.getMonth() + 1) + '-' + checkoutdate.getDate();

    //$scope.guestsSelected = $scope.guestsSelected;

    console.log("Listing Selected: "+$scope.listing);
    console.log("Checkout: "+ $scope.checkInDate);
    console.log("CheckIn: "+ $scope.checkOutDate);

    console.log("Guests Selected: "+$scope.guestsSelected);

    $scope.propertyinfo =$scope.listing.title+" "+$scope.listing.description+", "+$scope.listing.city;

    $scope.hostName = $scope.listing.hostName;


    $scope.roomType = $scope.listing.roomType;

    $scope.fixedPrice = $scope.listing.fixedPrice;

    $scope.bedrooms = "2 Bedroom Apartment"+" " +$scope.listing.description;

    $scope.propertyImage = $scope.listing.listingImages[0][0];;
    console.log("  $scope.propertyImage:"+  $scope.propertyImage);

    $scope.completeaddress = $scope.listing.address[0].address+", "+$scope.listing.address[0].city+", "+$scope.listing.address[0].state+", "+$scope.listing.address[0].ZipCode+", "+$scope.listing.address[0].country;
    console.log("Complete Address:"+$scope.completeaddress);

    $scope.guestAllowed = $scope.listing.guestAllowed;
    console.log("guestAllowed "+$scope.guestAllowed);

    $scope.usercomments ="";

    $scope.noGuests = [];

    for(var i = 1 ; i <= $scope.guestAllowed ; i++ ){
        $scope.noGuests.push(i);
    }

    //$scope.totalPrice = 255;

    /*pending from backend
    profilePic
    hostname*/






    /********book a trip function from landing page************/

    $scope.bookTrip = function(usercomments,guestsSelected)
    {
        console.log("*******Booking a Trip making api call*******")
        console.log("user Comments:"+usercomments);
        console.log("Guests Selected:"+guestsSelected);
        var sguests = Number(guestsSelected.slice(0,1));
        console.log("After SLice:"+sguests);

        if(sguests>$scope.guestAllowed)
        {
            $scope.guesterror =true;
            $scope.msg="Place can  accomadate maximum of " +$scope.guestAllowed+" guests"
        }

        else{

            console.log("suiteNum"+$scope.listing.address[0].suiteNum);
            console.log("zipcode"+$scope.listing.address[0].ZipCode);
            console.log("hostname"+$scope.listing.hostName);

            $scope.guesterror =false;
            $http({

                method : "POST",
                url: '/bookTrip',
                data: {


                    "userEmail": $scope.userName,
                    "hostEmail":$scope.listing.hostId,
                    "listId": $scope.listing.listId,
                    "fixedPrice": $scope.fixedPrice,
                    "totalPrice":$scope.totalPrice,
                    "checkInDate": $scope.checkInDate,
                    "checkOutDate":$scope.checkOutDate,
                    "userComments": usercomments,
                    "guestsSelected":guestsSelected,
                    "hostName":$scope.listing.hostName,
                    "listingTitle":$scope.listing.title,
                    "listingCity":$scope.listing.city,
                    "userName":$scope.userFirstName,
                    "zipCode":$scope.listing.address[0].ZipCode,
                    "streetAddress":$scope.listing.address[0].address,
                    "suiteNum":$scope.listing.address[0].suiteNum,
                    "hostProfilePic":$scope.listing.hostProfilePic,
                    "userProfilePic":$scope.profilePic



                }
            }).success(function(data)

            {
                console.log("Status Code " + data.statusCode);
                if(data.statusCode==200)
                {
                    console.log("Trip Booked ");
                    console.log(data);
                    alert("Booking Successfull");

                    localStorage.removeItem("eachListing");
                    localStorage.removeItem("listing");
                    localStorage.removeItem("checkInDate");
                    localStorage.removeItem("checkOutDate");
                    localStorage.removeItem("guestsSelected");
                    localStorage.removeItem("totalPrice");

                    $state.go("yourTrips");


                }
                else{
                    alert("Booking cannot be made.Please try again later")
                }


            })


        }






    };




});
