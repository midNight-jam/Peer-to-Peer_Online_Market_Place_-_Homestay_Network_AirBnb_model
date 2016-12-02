dashboard.controller("hostingAmnetiesController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){


console.log("Hello from amneties controller");
console.log("stateParams",$stateParams);
var allAmneties=[];
var safetyAmneties=[];

$scope.addAmneties = function (val){


var index = allAmneties.indexOf(val);

    if (index === -1) {
        allAmneties.push(val);
    } else {
        allAmneties.splice(index, 1);
    }

console.log(allAmneties);

}
$scope.addSafetyAmneties = function (val){


var index = safetyAmneties.indexOf(val);

    if (index === -1) {
        safetyAmneties.push(val);
    } else {
        safetyAmneties.splice(index, 1);
    }

console.log(safetyAmneties);

}


$scope.next=function()
	{
		console.log($stateParams.place);

		placeType =$stateParams.place;
		placeType.amneties={"safetyAmneties":safetyAmneties,"basicAmneties":allAmneties};
		$state.go('hostingSteps.spaces',{"place":placeType});
	}

}]);