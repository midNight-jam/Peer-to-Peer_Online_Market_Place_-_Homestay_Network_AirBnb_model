dashboard.controller("editProfileController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){
	$scope.loggedIn = isLoggedIn.data.user.firstname;
	$scope.profilePic = isLoggedIn.data.user.profilePic;
	$scope.host = isLoggedIn.data.user.host;
	console.log("In getProfile controller");
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
	
	$scope.save = function(fname,lname,gender,dob,email,pNumber,language,currency,stAddress,city,state,country,zipCode,aboutme,workEmail){
		if(fname == undefined){
			fname = '';
		}
		if(lname == undefined){
			lname = '';
		}
		if(gender == undefined){
			gender = '';
		}
		if(dob == undefined){
			dob = '';
		}
		if(email == undefined){
			email = '';
		}
		if(pNumber == undefined){
			pNumber = '';
		}
		if(language == undefined){
			language = '';
		}
		if(currency == undefined){
			currency = '';
		}
		if(stAddress == undefined){
			stAddress = '';
		}
		if(city == undefined){
			city = '';
		}
		if(state == undefined){
			state = '';
		}
		if(country == undefined){
			country = '';
		}
		if(zipCode == undefined){
			zipCode = '';
		}
		if(aboutme == undefined){
			aboutme = '';
		}
		if(workEmail == undefined){
			workEmail = '';
		} 
		var editProfileData = {
				'firstName': fname,
				'lastName': lname,
				'gender': gender,
				'dob': dob,
				'email': email,
				'pNumber': pNumber,
				'language': language,
				'currency': currency,
				'stAddress': stAddress,
				'city': city,
				'state': state,
				'country': country,
				'zipCode': zipCode,
				'aboutme': aboutme,
				'workEmail': workEmail
		};
		console.log(editProfileData);
		$http({
			method : 'POST',
			url : '/editProfile',
			data: {
				'data' : editProfileData, 
			}
		}).success(function(data){
			console.log(data);
			$scope.message = data.message;
		});
	};
	
	$scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";
	
}]);