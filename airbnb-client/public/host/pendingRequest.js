/**
 * Created by Mak on 11/25/16.
 */
dashboard.controller("pendingRequest",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){



    $scope.loggedIn=true;
    $scope.profilePic=isLoggedIn.data.user.profilePic;
    $scope.host=isLoggedIn.data.user.host;
    $scope.username=isLoggedIn.data.user.firstname;
    $scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";


    function pendingRequests ()
    {
        console.log("Hello from the pendingrequests");
        $http.post('/pendingRequests').success(function(res){

            console.log("all the pending request",res.requests);
            $scope.allRequest =res.requests;

        }).error(function(err){

            console.log(err);

        });

    }

    pendingRequests();


    $scope.hostAction =function(action,tripId, checkInDate, checkOutDate){

        if(action=="accept")
        {
            console.log("Accepted");
            $http.post('/approveRequests',{"tripId":tripId, "checkInDate": checkInDate, "checkOutDate": checkOutDate}).success(function(res){

                console.log(res);
                if(res.code==200)

                {

                }
            })
        }
        else if(action=="reject")
        {
            console.log("Rejecetd");
            $http.post('/rejectRequests',{"tripId":tripId}).success(function(res){

                console.log(res);
                if(res.code==200)

                {

                }
            })
        }

        pendingRequests();


    }

}]);