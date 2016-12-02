/**
 * Created by Gaurang on 15-11-2016.
 */


dashboard.controller('userList',  function ($scope, $http,$filter) {

            $scope.gridOptions = {
                data: [],
                urlSync: false
            };

            initialize();
            function initialize() {
                $scope.SearchByCity= '';

                $http({
                    method: "POST",
                    url: '/adminGetAllUserDetails',
                    data: {
                      
                    }
                }).success(function (responseData) {
                    $scope.AllUserParent= responseData;
                    $scope.AllUserList = responseData;
                    console.log(responseData);

                }).error(function (error) {
                    console.log("inside error");
                });
            }

            $scope.search = function()
            {
                if($scope.SearchByCity==''){

                    $scope.AllUserList = $scope.AllUserParent;
                }
                else {
                    var SelectedAllUserList = $filter('filter')($scope.AllUserParent, function (d) {
                        return d.city === $scope.SearchByCity;
                    });
                    console.log("SelectedAllUserList" + SelectedAllUserList);
                    $scope.AllUserList = SelectedAllUserList;
                }

            }

            $scope.getUserDetails = function(user)
            {
                $scope.Selectedemail= user.email;
                $scope.Selectedfirstname= user.firstname;
                $scope.Selectedlastname= user.lastname;
                $scope.Selectedhost= user.host;
                $scope.Selectedcreated_at= user.created_at;
                $scope.SelecteduserId= user.userId;
                $scope.SelectedaboutMe= user.aboutMe;
                $scope.Selectedbirthday= user.birthday;
                $scope.SelectedstreetAddress= user.streetAddress;
                $scope.Selectedcity= user.city;
                $scope.Selectedstate= user.state;
                $scope.Selectedcountry= user.country;
                $scope.Selectedgender= user.gender;
                $scope.SelectedphoneNumber= user.phoneNumber;
                $scope.SelectedpreferCurr= user.preferCurr;
                $scope.SelectedpreferLang= user.preferLang;
                $scope.SelectedworkEmail= user.workEmail;
                $scope.Selectedzipcode= user.zipcode;
                $scope.SelectedprofileImages = user.profileImages;
            }

            $scope.reset = function(){
                $scope.AllUserList = $scope.AllUserParent;
            }
})
