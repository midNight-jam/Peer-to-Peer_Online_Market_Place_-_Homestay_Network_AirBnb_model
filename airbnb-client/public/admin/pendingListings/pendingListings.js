/**
 * Created by Gaurang on 15-11-2016.
 */
dashboard.controller('pendingListings',function($scope, $filter,$http){

    $scope.invalid_login = true;
    $scope.unexpected_error = true;

    console.log("Admin: inside getNewListings controller.");

    initialize();
    function initialize() {
        $http({
            method: "POST",
            url: '/adminGetAllNewListing',
            data: {}
        }).success(function (data) {
            console.log("inside success");
            console.log(data);

            $scope.pendingListings = data;

        }).error(function (error) {
            console.log("inside error");
            console.log(error);

        });
    }


    $scope.setStatusForPendingListing = function(pendingListing,status){
        console.log("Inside setStatusForPendingListing.");

          $http({
                method: "POST",
                url: '/setStatusForPendingListing',
                data: {
                    pendingListing: pendingListing,
                    status: status
                }
            }).success(function (data) {
                console.log("inside success");
                initialize();
                window.location.assign("#/pendingListings");
                //set all variables.

            }).error(function (error) {
                console.log("inside error");
                console.log(error);

                initialize();
            });

    }

});