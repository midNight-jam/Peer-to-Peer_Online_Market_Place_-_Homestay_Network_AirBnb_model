/**
 * Created by Gaurang on 26-11-2016.
 */
dashboard.controller("viewProfileController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){
    $scope.loggedIn = true;
    $scope.username=isLoggedIn.data.user.firstname;
    $scope.profilePic = isLoggedIn.data.user.profilePic;
    $scope.host = isLoggedIn.data.user.host;
    console.log("In getProfile controller" ,isLoggedIn);
    $scope.message = '';
    $http({
        method : 'GET',
        url : '/userProfile'
    }).success(function(data){
        console.log(data);
        if(data.statusCode == '200'){
            $scope.fname = data.profile.firstname;
            $scope.lname = data.profile.lastname;
            $scope.gender = data.profile.gender;
            $scope.dob = data.profile.birthday;
            $scope.email = data.profile.email;
            $scope.pNumber = data.profile.phoneNumber;
            $scope.language = data.profile.preferLang;
            $scope.currency = data.profile.preferCurr;
            $scope.stAddress = data.profile.streetAddress;
            $scope.city = data.profile.city;
            $scope.state = data.profile.state;
            $scope.country = data.profile.country;
            $scope.zipCode = data.profile.zipcode;
            $scope.aboutme = data.profile.aboutMe;
            $scope.workEmail = data.profile.workEmail;
        }
    });


    $scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";

}]);