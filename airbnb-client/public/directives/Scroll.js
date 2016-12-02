/**
 * Created by Mak on 11/21/16.
 */


dashboard.directive("scroll", function ($window) {
    console.log("Hello from scroll directive");
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 100) {
                scope.headerChangeClass = "headerChange";
            } else {
                scope.headerChangeClass = false;
            }
                scope.$applyAsync();
        });
    };
});