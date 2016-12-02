dashboard.controller("accountSettingsController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){

	$scope.loggedIn = isLoggedIn.data.user.firstname;
	$scope.profielpic = isLoggedIn.data.user.profilePic;
	$scope.host = isLoggedIn.data.user.host;
	$scope.message = '';
	var currDate = new Date();
	var enteredDate = new Date();
	$scope.payments=[];
	$http({
		method : 'GET',
		url : '/getPaymentDetails',
	}).success(function(data){
		console.log(data.payment[0]);
		if(data.statusCode == '200'){
			for(var i=0;i<data.payment[0].paymentMethod.length;i++){
				var getPayment = {};
				var cardNumber = data.payment[0].paymentMethod[i].cardNumber;
				var lastFourNo = cardNumber.substring(12,16);
				getPayment.lastFour = lastFourNo;
				getPayment.expiry = data.payment[0].paymentMethod[i].expiryMonth + " / " + data.payment[0].paymentMethod[i].expiryYear;
				getPayment.cardHolder = data.payment[0].paymentMethod[i].billingFirstName+" "+data.payment[0].paymentMethod[i].billingLastName;
				$scope.payments.push(getPayment);
			}
		}
	});
	$scope.addCard = function(cardNumber,expiryMonth,expiryYear,cvv,billingCountry,billingFirstName,billingLastName){
		if(cardNumber == undefined){
			cardNumber = '';
		}
		if(expiryMonth == undefined){
			expiryMonth = '';
		}
		if(expiryYear == undefined){
			expiryYear = '';
		}
		if(cvv == undefined){
			cvv = '';
		}
		if(billingCountry == undefined){
			billingCountry = '';
		}
		if(billingFirstName == undefined){
			billingFirstName = '';
		}
		if(billingLastName == undefined){
			billingLastName = '';
		}
		var paymentDetails = {
			'cardNumber': cardNumber,
			'expiryMonth': expiryMonth,
			'expiryYear': expiryYear,
			'cvv': cvv,
			'billingCountry': billingCountry,
			'billingFirstName': billingFirstName,
			'billingLastName': billingLastName
		};
		var month = Number(expiryMonth)-1;
		var year = Number(expiryYear);
		var enteredSeconds = enteredDate.setFullYear(year, month, 1);
		var currSeconds = currDate.setFullYear(currDate.getFullYear(), currDate.getMonth(), 1);

		if(cardNumber.length != "16"){
			$scope.errormsgpayment = true;
			$scope.message = 'Card Number should be of 16 digits!';
		}
		else if(enteredSeconds < currSeconds){
			$scope.errormsgpayment = true;
			$scope.message = 'Please choose an expriy date greater than or equal to today!';				
		}
		else if(cvv.length < 3){
			$scope.errormsgpayment = true;
			$scope.message = 'CVV should be 3 digit!';
		}
		else{
			$http({
				method : 'POST',
				url : '/paymentDetails',
				data: {
					'data' : paymentDetails,
					'email': isLoggedIn.data.user.email
				}
			}).success(function(data){
				$scope.errormsgpayment = true;
				$scope.message = data.message;
			});
		}
	}
	
	$scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";

}]);