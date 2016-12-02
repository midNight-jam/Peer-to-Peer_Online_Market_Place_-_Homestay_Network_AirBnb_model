/**
 * http://usejsdoc.org/
 */
dashboard.controller("yourTripsController", function($scope,$http ,$state,isLoggedIn,auth) {


    console.log("reached yourTripsController controller");

    $scope.loggedIn = true;
    console.log(isLoggedIn);

    $scope.profilePic = isLoggedIn.data.user.profilePic;

    $scope.host = isLoggedIn.data.user.host;
    console.log(auth.getUserInfo());

    $scope.logout = function () {
        auth.logout();
    };

    $scope.dropdownChange = "changeDropdown";

    $scope.userName = isLoggedIn.data.user.email;

   /* $scope.paymentButton = [];

    $scope.edittripButton =[];

    $scope.billButton = [];

    $scope.cancelTripButton =[];*/


    $http({

        method: "POST",
        url: '/getPendingTrips',
        data: {
            "userEmail": $scope.userName
        }
    }).success(function (data) {
        console.log("Status Code " + data.statusCode);
        if (data.statusCode == 200) {
            console.log("Fetched Pending Trips ");
            console.log(data);
            $scope.pendingTrips = data.pendingTrips;

            $scope.paymentButton = [];

            $scope.edittripButton =[];

            $scope.billButton = [];

            $scope.cancelTripButton =[];

            for (var i = 0; i < $scope.pendingTrips.length; i++) {

                if ($scope.pendingTrips[i].tripStatus == "pendingHostApproval" && $scope.pendingTrips[i].paymentStatus == "pending") {
                    $scope.paymentButton.push(true);
                    $scope.billButton.push(true);
                    $scope.cancelTripButton.push(false);
                    $scope.edittripButton.push(false);



                }
                else if ($scope.pendingTrips[i].tripStatus == "approvedByHost" && $scope.pendingTrips[i].paymentStatus == "pending") {
                    console.log("paymentbutton:" + $scope.pendingTrips[i].tripStatus);
                    $scope.paymentButton.push(false);
                    $scope.billButton.push(true);
                    $scope.cancelTripButton.push(false);
                    $scope.edittripButton.push(false);



                }

                else if ($scope.pendingTrips[i].tripStatus == "approvedByHost" && $scope.pendingTrips[i].paymentStatus == "paid")
                {
                    console.log("billbutton:" + $scope.pendingTrips[i].paymentStatus);
                    $scope.paymentButton.push(true);
                    $scope.billButton.push(false);
                    $scope.edittripButton.push(true);
                    $scope.cancelTripButton.push(true);

                }
                /*else if ($scope.pendingTrips[i].tripStatus == "tripCancelledbyUser")
                {
                    console.log("billbutton:" + $scope.pendingTrips[i].tripStatus);
                    $scope.billButton.push(true);

                }*/
            }
        }

        else {

            $scope.noTripsfound = true;
            $scope.noTrips = "No Trips Found"
        }


    })


    //Function for paying the amount

    $scope.pay = function (tripId, totalPrice) {
        console.log(tripId);
        console.log(totalPrice);
        $http({

            method: "POST",
            url: '/getCardDetails',

        }).success(function (data) {
            console.log("Status Code " + data.statusCode);
            if (data.statusCode == 200) {
                console.log("Fetched card details");
                console.log(data);
                console.log("Length Card:" + data.cardDetails.paymentMethod.length);
                $scope.cardDetails = {};

                if (data.cardDetails.paymentMethod.length > 0) {

                    $scope.cardDetails.cardNumber = data.cardDetails.paymentMethod[0].cardNumber;
                    console.log("$scope.cardNumber" + $scope.cardNumber);
                    $scope.cardDetails.cvv = data.cardDetails.paymentMethod[0].cvv;
                    $scope.cardDetails.expiryMonth = data.cardDetails.paymentMethod[0].expiryMonth;
                    $scope.cardDetails.expiryYear = data.cardDetails.paymentMethod[0].expiryYear;
                    console.log("expirty year:"+$scope.cardDetails.expiryYear);
                    $scope.cardDetails.billingCountry = data.cardDetails.paymentMethod[0].billingCountry;
                    $scope.cardDetails.billingFirstName = data.cardDetails.paymentMethod[0].billingFirstName;
                    $scope.cardDetails.billingLastName = data.cardDetails.paymentMethod[0].billingLastName;
                    $scope.cardDetails.tripId = tripId;
                    $scope.cardDetails.totalPrice = totalPrice;


                }
                else {
                    console.log("no card found");
                    $scope.cardDetails.tripId = tripId;
                    $scope.cardDetails.totalPrice = totalPrice;

                }


            }

            else {

                $scope.noTripsfound = true;
                $scope.noTrips = "No Trips Found"
                // $('#myModal').modal('show');
            }


        })


    }

    $scope.makePayment = function (cardNumber, expiryMonth, expiryYear, cvv, billingCountry, billingFirstName, billingLastName) {

        console.log("expiryMonth:"+expiryMonth);

        console.log("expiryYear:"+expiryYear);
        console.log("trip id:" + $scope.cardDetails.tripId);
        var enteredDate = new Date();
        var currDate = new Date();
        var month = Number(expiryMonth)-1;
        var year = Number(expiryYear);
        var enteredSeconds = enteredDate.setFullYear(year, month, 1);
        console.log("enterd seds"+enteredSeconds);
        var currSeconds = currDate.setFullYear(currDate.getFullYear(), currDate.getMonth(), 1);
        console.log("currSeconds "+currSeconds);

        if(cardNumber.length != "16"){
            console.log("invalid card number");
            $scope.errormsgpayment = true;
            $scope.message = 'Card Number should be of 16 digits!';
        }
        else if(enteredSeconds < currSeconds){
            $scope.errormsgpayment = true;
            $scope.message = 'Please choose an expiry date greater than or equal to today!';
        }
        else if(cvv.length < 3){
            $scope.errormsgpayment = true;
            $scope.message = 'CVV should be 3 digit!';
        }

        else{
            $http({
                method: "POST",
                url: '/makePayment',
                data: {
                    "cardNumber": cardNumber,
                    "expiryMonth": expiryMonth,
                    "expiryYear": expiryYear,
                    "cvv": cvv,
                    "tripId": $scope.cardDetails.tripId
                }

            }).success(function (data) {
                console.log("data" + data);
                if (data.statusCode == "200") {
                    console.log("Payment Successfull");

                    $scope.paysuc = true;
                    $scope.paysuccess = "Payment Successful";

                    $scope.disablepayment = true;
                    $("#myModal").on("hidden.bs.modal", function () {
                        $state.reload();
                    });

                }

                else {
                    console.log("Payment cannot be made.Please try again later");
                }

            })
        }




    }


    $scope.calcBill = function () {
        $(".bookTripDiv").css({"height": "200px"});
        var currentDate = new Date().toISOString().split('T')[0];
        if ($scope.checkInDate == undefined || $scope.checkOutDate == undefined) {
            $scope.showBill = false;
            $scope.sendrequest = true;
            return;
        }
        else {
            if ($scope.checkInDate > $scope.checkOutDate) {
                $scope.datesNotAvailable = true;
                $scope.sendrequest = true;
                $scope.showBill = false;
                $scope.msgdates = "CheckIn date should be before CheckOut date";
                return;
            }

            var indate = $scope.checkInDate;
            $scope.checkindate = indate.toISOString().split('T')[0];

            var outdate = $scope.checkOutDate;
            $scope.checkoutdate = outdate.toISOString().split('T')[0];
            if ($scope.checkindate === $scope.checkoutdate) {
                $scope.datesNotAvailable = true;
                $scope.sendrequest = true;
                $scope.showBill = false;
                $scope.msgdates = "CheckIn date and CheckOut date cannot be same";
                return;
            }

            else if ($scope.checkindate < currentDate) {
                $scope.datesNotAvailable = true;
                $scope.sendrequest = true;
                $scope.showBill = false;
                $scope.msgdates = "Please select a date after current date";
                return;
            }

            /* else if($scope.checkindate < new Date($scope.listingDetails.fromDate).toISOString().split(' ')[0]){
             $scope.datesNotAvailable = true;
             $scope.showBill = false;
             $scope.msgdates = "CheckIn date should be after "+new Date($scope.listingDetails.fromDate).toISOString().split('T')[0];
             return;
             }*/

            /* else if($scope.checkoutdate > new Date($scope.listingDetails.toDate).toISOString().split(' ')[0]){
             $scope.datesNotAvailable = true;
             $scope.showBill = false;
             $scope.msgdates = "CheckOut date should be before "+new Date($scope.listingDetails.toDate).toISOString().split('T')[0];
             return;
             }*/
            else {
                $(".bookTripDiv").css({"height": "300px"});
                console.log("calculting bill");
                var timeDiff = Math.abs($scope.checkOutDate.getTime() - $scope.checkInDate.getTime());
                $scope.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                $scope.totalPrice = ($scope.editTrip.fixedPrice * $scope.diffDays);
                $scope.datesNotAvailable = false;
                $scope.showBill = true;
            }
        }
    }


    $scope.checkavail = function () {

        //Removing Time Stamp From CheckIn/Out Dates
        var currentDate = new Date().toISOString().split('T')[0];

        if ($scope.checkInDate == undefined || $scope.checkOutDate == undefined) {
            $scope.datesNotAvailable = true;
            $scope.sendrequest = true;
            $scope.msgdates = "Please select both CheckIn and CheckOut Date";
            return;
        }

        if ($scope.guestsSelected == undefined) {
            $scope.datesNotAvailable = true;
            $scope.sendrequest = true;
            $scope.msgdates = "Please select number of Guests";
            return;

        }

        if ($scope.checkInDate > $scope.checkOutDate) {
            $scope.datesNotAvailable = true;
            $scope.sendrequest = true;
            $scope.msgdates = "CheckIn date should be before CheckOut date";
            return;
        }

        else {

            var indate = $scope.checkInDate;
            $scope.checkindate = indate.toISOString().split('T')[0];

            var outdate = $scope.checkOutDate;
            $scope.checkoutdate = outdate.toISOString().split('T')[0];
            if ($scope.checkindate === $scope.checkoutdate) {
                $scope.datesNotAvailable = true;
                $scope.sendrequest = true;
                $scope.msgdates = "CheckIn date and CheckOut date cannot be same";
                return;
            }

            else if ($scope.checkindate < currentDate) {
                $scope.datesNotAvailable = true;
                $scope.sendrequest = true;
                $scope.msgdates = "Please select a date after current date";
                return;
            }

            /*   else if($scope.checkindate < new Date($scope.listingDetails.fromDate).toISOString().split(' ')[0]){
             $scope.datesNotAvailable = true;
             $scope.msgdates = "CheckIn date should be after "+new Date($scope.listingDetails.fromDate).toISOString().split('T')[0];
             }*/

            /* else if($scope.checkoutdate > new Date($scope.listingDetails.toDate).toISOString().split(' ')[0]){
             $scope.datesNotAvailable = true;
             $scope.msgdates = "CheckOut date should be before "+new Date($scope.listingDetails.toDate).toISOString().split('T')[0];
             return;
             }*/
            else {

                $scope.sendrequest = true;
                console.log("checking dates");
                console.log("listid:" + $scope.editTrip.listId);
                console.log($scope.checkindate);
                console.log($scope.checkoutdate);
                console.log("trip id:" + $scope.editTrip.tripId)
                $http({

                    method: "POST",
                    url: '/checkDates',
                    data: {


                        "listId": $scope.editTrip.listId,
                        "checkInDate": $scope.checkindate,
                        "checkOutDate": $scope.checkoutdate


                    }
                }).success(function (data) {
                    console.log("Status Code " + data.statusCode);
                    if (data.statusCode == 200) {
                        console.log("Dates Available");
                        console.log(data);
                        $scope.sendrequest = false;
                        $scope.datesNotAvailable = true;
                        $scope.msgdates = "Lucky!! New dates available";

                    }
                    else if (data.statusCode == 401) {

                        $scope.sendrequest = true;
                        console.log("Dates Not Available");
                        var bookedDates = data.bookedDates;
                        console.log(bookedDates);
                        $scope.datesNotAvailable = true;
                        $scope.msgdates = "Property already booked for the selected dates";

                    }
                    else {

                        $scope.datesNotAvailable = true;
                        $scope.msgdates = "You already have booked this property for the dates selected";

                    }


                })
            }
        }
    }

    $scope.editTrip = function (fixedPrice, tripId, hostName, listingTitle, streetAddress, listingCity, listId) {
        $scope.sendrequest = true;

        console.log(listingTitle);
        console.log(tripId);
        console.log(hostName);
        console.log(streetAddress);
        console.log(listingCity);


        $scope.editTrip.fixedPrice = fixedPrice;
        $scope.editTrip.tripId = tripId;
        $scope.editTrip.hostName = hostName;
        $scope.editTrip.listingTitle = listingTitle;
        $scope.editTrip.streetAddress = streetAddress;
        $scope.editTrip.listingCity = listingCity;
        $scope.editTrip.listId = listId;


    }


    $scope.updateTrip = function(checkInDate,checkOutDate) {


     console.log("tripid" + $scope.editTrip.tripId);
     console.log("Total Price:" + $scope.totalPrice);
     console.log("checkin:" + checkInDate);
     console.log("checkout:" + checkOutDate);

     $http({

     method: "POST",
     url: '/updateTrip',
     data: {


     "tripId": $scope.editTrip.tripId,
     "checkInDate": checkInDate,
     "checkOutDate": checkOutDate


     }
     }).success(function (data) {
     console.log("Status Code " + data.statusCode);
     if (data.statusCode == 200) {
     console.log("Trip Updated");
     console.log(data);
         alert("Trip Updated");
         $scope.disablepayment = true;
         $("#editTripModal").on("hidden.bs.modal", function () {
             $state.reload();
         });


     }

     })

     }




    $scope.cancelTrip = function(tripId) {


        console.log("tripid" + tripId);


        $http({

            method: "POST",
            url: '/cancelTrip',
            data: {

                "tripId": tripId
            }
        }).success(function (data) {
            console.log("Status Code " + data.statusCode);
            if (data.statusCode == 200) {
                console.log("Trip cancelled");
                console.log(data);
                alert("Trip cancelled");
                $state.reload();

                }

                else{
                alert("trip cannot be cancelled");
            }

        })

    }

    $scope.viewBill= function()
    {
        console.log("fetching bill");


    }

})