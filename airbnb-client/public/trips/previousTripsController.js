/**
 * http://usejsdoc.org/
 */
dashboard.controller("previousTripsController", function($scope,$http ,$state,isLoggedIn,auth){



console.log("reached previousTripsController controller");

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

    $scope.billButton=[];


   $http({

        method : "POST",
        url: '/getPreviousTrips',
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

            for(var i=0;i< $scope.previousTrips.length;i++)
            {

                if($scope.previousTrips[i].tripStatus=="tripCancelledbyUser")

                {
                    console.log("button:"+$scope.previousTrips[i].tripStatus);
                    $scope.billButton.push(true);

                }
            }
        }

        else
            {
            alert("No Trips Found for this user");
                $scope.noTripsfound = true;
                $scope.noTrips = "No Trips Found"
        }


    })






});