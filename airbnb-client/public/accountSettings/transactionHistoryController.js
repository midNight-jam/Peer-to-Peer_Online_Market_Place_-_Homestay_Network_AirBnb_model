dashboard.controller("transactionHistoryController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){

	$scope.loggedIn = isLoggedIn.data.user.firstname;
	$scope.profielpic = isLoggedIn.data.user.profilePic;
	$scope.host = isLoggedIn.data.user.host;
	
	$scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";

}]);
