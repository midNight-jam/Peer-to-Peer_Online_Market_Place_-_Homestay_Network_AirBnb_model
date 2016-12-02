dashboard.controller("hostingSpacesController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){


console.log("Hello from spaces controller");
console.log("stateParams",$stateParams);
var allSpaces=[];
var placeType;

$scope.addSpaces = function (val){


var index = allSpaces.indexOf(val);

    if (index === -1) {
        allSpaces.push(val);
    } else {
        allSpaces.splice(index, 1);
    }

console.log(allSpaces);

}

$scope.next=function()
    {
        console.log($stateParams.place);

        placeType =$stateParams.place;
        placeType.spaces=allSpaces;
        $state.go('hostingSteps.description',{"place":placeType});
    }

}]);