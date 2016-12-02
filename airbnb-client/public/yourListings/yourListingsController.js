dashboard.controller("yourListingsController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){
	$scope.loggedIn = isLoggedIn.data.user.firstname;
	$scope.profilepic = isLoggedIn.data.user.profilePic;
	$scope.host = isLoggedIn.data.user.host;
	$scope.listings = [];
	$http({
		method : 'POST',
		url : '/yourListings',
		data: {
			'username' : isLoggedIn.data.user.email
		}
	}).success(function(data){
		console.log(data);

		$scope.allList = data.listings;
		if(data.statusCode == '200'){
			$scope.message = '';
			for(var i =0;i<data.listings.length;i++){
				var pushedList = {};
				console.log(data.listings[i].product);
				pushedList.id = data.listings[i]._id;
				pushedList.name = data.listings[i].title;
				pushedList.description = data.listings[i].description;
				pushedList.price = data.listings[i].fixedPrice;
				pushedList.address = data.listings[i].address[0].suiteNum + " " + data.listings[i].address[0].address + ", " + data.listings[i].address[0].city + ", " + data.listings[i].address[0].state + ", " + data.listings[i].address[0].country + ", " + data.listings[i].address[0].ZipCode;
				var fromSplit = data.listings[i].fromDate.toString().split("T");
				var fromSecondSplit = fromSplit[1].split(".");
				pushedList.fromDate = fromSplit[0]+" "+fromSecondSplit[0];
				var toSplit = data.listings[i].toDate.toString().split("T");
				var toSecondSplit = fromSplit[1].split(".");
				pushedList.toDate = toSplit[0]+" "+toSecondSplit[0];
				var createdSplit = data.listings[i].created_at.toString().split("T");
				var createdSecondSplit = fromSplit[1].split(".");
				pushedList.createdDate = createdSplit[0]+" "+createdSecondSplit[0];
				$scope.listings.push(pushedList);
			}
		}else{
			$scope.message = data.message;
		}
	});
	
	$scope.removeListing = function(list_id){
		console.log(list_id);
		$http({
			method: "POST",
			url: "/deleteListing",
			data: {
				'id': list_id
			}
		}).success(function(data){
			//checking the response data for statusCode
			console.log(data);
			console.log("When deleted pressed"+data.statusCode);
			if(data.statusCode === '200'){
				$state.reload();
			}
		});
	};



    $scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";





}]);