/**
 * Created by Gaurang on 29-11-2016.
 */
/**
 * Created by Gaurang on 15-11-2016.
 */

dashboard.controller('billList',  function ($scope, $http,$filter) {

    $scope.gridOptions = {
        data: [],
        urlSync: false
    };

    initialize();
    function initialize() {
        $scope.SearchByCity= '';

        //call with redis
        $http({
            method: "GET",
            url: '/adminGetAllBillDetails',
            data: {

            }
        }).success(function (responseData) {
            $scope.AllBillParent = responseData;
            $scope.AllBillList = responseData;
            console.log(responseData);

        }).error(function (error) {
            console.log("inside error");
        });

        //Normal call
        /* $http({
         method: "POST",
         url: '/adminGetAllHostDetails',
         data: {

         }
         }).success(function (responseData) {
         $scope.AllHostParent = responseData;
         $scope.AllHostList = responseData;
         console.log(responseData);

         }).error(function (error) {
         console.log("inside error");
         });*/
    }

    $scope.search = function()
    {
        if($scope.dateSelectedForSearch==null){

            $scope.AllBillList = $scope.AllBillParent
        }
        else {
            var SelectedAllBillList = $filter('filter')($scope.AllBillParent, function (d) {
                return d.billDate === $scope.dateSelectedForSearch.toISOString();
            });
            console.log("SelectedAllBillList" + SelectedAllBillList);
            $scope.AllBillList = SelectedAllBillList;
        }

    }



    $scope.searchByMonth = function()
    {
        if($scope.SelectedMonth==null || $scope.SelectedYear==null){

            $scope.AllBillList = $scope.AllBillParent
        }
        else {
            var SelectedAllBillList = $filter('filter')($scope.AllBillParent, function (d) {

                return ((new Date(d.billDate).getMonth()+1 === parseInt($scope.SelectedMonth)) && (new Date(d.billDate).getYear() === parseInt($scope.SelectedYear)));
            });
            console.log("SelectedAllBillList" + SelectedAllBillList);
            $scope.AllBillList = SelectedAllBillList;
        }

    }

    $scope.getBillDetails = function(bill)
    {
       $scope.SelectedbillDate= bill.billDate;
        $scope.SelectedcardNumber= bill.cardNumber;
        $scope.SelectedcheckInDate= bill.checkInDate;
        $scope.SelectedcheckOutDate= bill.checkOutDate;
        $scope.SelectedfixedPrice= bill.fixedPrice;
        $scope.SelectedguestsSelected= bill.guestsSelected;
        $scope.SelectedhostEmail= bill.hostEmail;
        $scope.SelectedhostName= bill.hostName;
        $scope.SelectedlistingCity= bill.listingCity;
        $scope.SelectedlistingTitle= bill.listingTitle;
        $scope.SelectedpaymentStatus= bill.paymentStatus;
        $scope.SelectedstreetAddress= bill.streetAddress;
        $scope.SelectedsuiteNum= bill.suiteNum;
        $scope.SelectedtotalPrice= bill.totalPrice;
        $scope.SelectedtripStatus= bill.tripStatus;
        $scope.Selectedtripsequence= bill.tripsequence;
        $scope.SelecteduserComments= bill.userComments;
        $scope.SelecteduserEmail= bill.userEmail;
        $scope.SelecteduserName= bill.userName;
        $scope.SelectedzipCode= bill.zipCode;
    }

    $scope.reset = function()
    {
        $scope.AllBillList = $scope.AllBillParent;
    }
})

