dashboard.controller("hostingStepLocationController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){

console.log("location controller");
console.log($stateParams);
var statusCode = '';
$scope.next=function(country, address, city, suiteNumber, state)
	{
		$scope.addresses = [];
		console.log("Country " + country + "Address " + address + "City " + city + "SuiteNumber " + suiteNumber + "state " + state);
		console.log($stateParams.place);
		if((country === undefined || country === " ") || (address === undefined || address === " ") || (city === undefined || city === " ") || (state === undefined || state === " ")){
			$scope.error = 'Please provide value for Street Address, City, State and Country';
		}else{
			$http({
				method : 'POST',
				url : '/addressValidator',
				data: {
					'country' : country,
					'address' : address,
					'city' : city,
					'state' : state
				}
			}).success(function(data) {
				//checking the response data for statusCode
				console.log(data);
				console.log(data.statusCode);
				statusCode = data.statusCode;
				if(data.statusCode == "200"){
					placeType = $stateParams.place;
					placeType.longitude = data.addressCoordinate.lon;
					placeType.latitude = data.addressCoordinate.lat;
					placeType.address=$scope.place;
					$state.go('hostingSteps.amneties',{"place":placeType});
				}else if(data.statusCode == "401"){
					//$('#myModal').modal('show');
					$scope.error = 'Enter valid values for Street Address, City, State and Country!';
					$scope.suggestion = '';
				}else{
					//$('#myModal').modal('show');
					$scope.suggestion = 'Did you mean!';
					$scope.error = '';
					for(var i =0;i<data.suggestedAddress.length;i++){
						var pushedAddress = {};
						pushedAddress.name = data.suggestedAddress[i];
						$scope.addresses.push(pushedAddress);
					}
					console.log(data.suggestedAddress);
				}
			});
		}
	}
}]);
