/**
 * http://usejsdoc.org/
 */
dashboard.controller("auctionTripsController", function($scope,$http ,$state,isLoggedIn,auth){



console.log("reached auctionTripsController controller");

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

    //$scope.paymentButton=[];


   $http({

        method : "POST",
        url: '/getAuctionTrips',
        data: {


            "userEmail": $scope.userName



        }
    }).success(function(data)

    {
        console.log("Status Code " + data.statusCode);
        if(data.statusCode==200)
        {
            console.log("Fetched Pending Trips ");
            console.log(data);
            $scope.previousTrips = data.pendingTrips;

            /*for(var i=0;i< $scope.pendingTrips.length;i++)
            {

                if($scope.pendingTrips[i].tripStatus=="approvedByHost")
                {
                    console.log("button:"+$scope.pendingTrips[i].tripStatus);
                    $scope.paymentButton.push(false);
                }
            }*/
        }

        else
            {

                $scope.noTripsfound = true;
                $scope.noTrips = "No Trips Found"
        }


    })






});