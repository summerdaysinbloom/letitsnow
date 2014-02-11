var app = angular.module('ngControllers', []);

app
.controller('MainCtrl', ['$scope', '$location', '$http',
    function($scope, $location, $http) {
        $scope.playfilm = function() {
            console.log('playfilm');
        }
    }
])
.controller('AgeGateCtrl',['$scope', '$location',
	function($scope, $location) {
        // Added this at the moment only for page sliding effect
		$scope.submit = function() {
            $location.path('/landing');
        };
        $scope.muslim = 'false';
	}
])
.controller('LandingPageCtrl', ['$scope', '$timeout', 
    function($scope, $timeout) {

        console.log('[C]landing page');

        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())  ;
            }
        };
        
        if(isMobile.any()){
            // Mobile!
        } else {
            // Not mobile
            console.log('not mobile');
            
            $timeout(function() {
                console.log('timeout');
                func();

            }, 300);

        }

    }
])
.controller('MadeofmorePageCtrl', ['$scope', 
	function($scope) {
        $scope.playfilm = function() {
            console.log('playfilm');
        }

        // $scope.items = [];
    
        // var counter = 0;
        // $scope.loadMore = function() {
        //     for (var i = 0; i < 30; i++) {
        //         $scope.items.push({id: counter});
        //         counter += 10;
        //     }
        // };
        
        // console.log('%%%',$scope);

        // $scope.loadMore();
	}
])
.controller('AgeGateBlockCtrl',['$scope',
    function($scope) {

    }
])
.controller('RedirectingCtrl',['$scope',
    function($scope) {

    }
])
.controller('BehindTheSceneCtrl', ['$scope',
    function($scope) {

    }
])
.controller('TestCtrl', ['$scope', '$location', '$timeout',
    function($scope, $location , $timeout ) {
        $scope.country = 'Country';

        $scope.submitMobile = function() {
            $location.path('/landing');
        };

        $scope.submit = function() {
            $location.path('/landing');
        };

        $scope.muslim = 'false';

        $scope.click = function() {
            $timeout(function() {
                $location.path('/age-gate-block'); 
            }, 1000);
        }
    }
])
.controller('TestInfiniteCtrl',['$scope',
    function($scope) {
        console.log('[C]TestInfiniteCtrl');

        $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

        $scope.loadMore = function() {
            var last = $scope.images[$scope.images.length - 1];
            for(var i = 1; i <= 8; i++) {
                $scope.images.push(last + i);
            }
        };

    }
]);