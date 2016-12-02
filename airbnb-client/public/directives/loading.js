/**
 * Created by Mak on 11/21/16.
 */
dashboard.directive('loading',   ['$http' ,function ($http)
{

    console.log("HEllo from laoding directive");
    return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    elm.show();
                }else{
                    elm.hide();
                }
            });
        }
    };

}]);
