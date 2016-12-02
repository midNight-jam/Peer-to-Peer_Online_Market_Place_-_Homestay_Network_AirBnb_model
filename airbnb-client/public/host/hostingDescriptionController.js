dashboard.controller("hostingDescriptionController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){
console.log("hello from description controller");
var placeType;
$scope.next=function()
    {
        console.log($stateParams.place);
        placeType =$stateParams.place;
        placeType.description=$scope.place;
        $state.go('hostingSteps.price',{"place":placeType});
    };
}]);