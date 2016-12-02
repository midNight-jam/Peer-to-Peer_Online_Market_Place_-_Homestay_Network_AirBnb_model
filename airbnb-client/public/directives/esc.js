
dashboard.directive('ngEsc', function () {
    console.log("hello from directive");
    return function (scope, element, attrs) {
        element.bind("keydown keypress keyup", function (event) {
            console.log("hello from directive checking key press");
            if(event.which === 27) {
                console.log("hello from directive key pressed");
                scope.$apply(function (){
                    scope.$eval(attrs.ngEsc);
                });

                event.preventDefault();
            }
        });
    };
});
