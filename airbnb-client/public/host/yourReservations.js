/**
 * Created by Mak on 11/25/16.
 */

dashboard.controller("yourReservations",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){


    $scope.loggedIn=true;
    $scope.profilePic=isLoggedIn.data.user.profilePic;
    $scope.host=isLoggedIn.data.user.host;
    $scope.username=isLoggedIn.data.user.firstname;
    $scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";

    function yourReservations ()
    {
        console.log("Hello from the yourReservations");
        $http.post('/yourReservations').success(function(res){

            console.log("all the yourReservations request",res  );
            $scope.allRequest =res.requests;

        }).error(function(err){

            console.log(err);

        });

    }

    yourReservations();


}]);