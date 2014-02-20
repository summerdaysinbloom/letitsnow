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
            console.log('not mobile, landing page will load video');
            
            $timeout(function() {
                console.log('timeout, calling function func()');
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
        // jsonp
        // $http.jsonp(""+'&callback=JSON_CALLBACK')      

        // infinite loading effect
        $scope.items = [];    
        var counter = 0;

        $scope.loadingPost = function() {
            for (var i = 0; i < 9; i++) {
                $scope.items.push({id: counter});
                counter += 9;
            }
        };
        
        $scope.loadingPost();
    }
])
.controller('AgeGateBlockCtrl',['$scope',
    function($scope) {

    }
])
.controller('RedirectingCtrl',['$timeout', '$location', 
    function($timeout, $location) {
        $timeout(function() {
            $location.path('/landing'); 
        }, 3000);
    }
])
.controller('BehindTheSceneCtrl', ['$scope',
    function($scope) {

    }
])
.controller('TestCtrl', ['$scope', '$location', '$timeout', '$http',
    function($scope, $location , $timeout, $http) {


        // initial value for the listing country and muslim checkbox
        $scope.country = 'Country';
        $scope.muslim = 'false';

        // when user is muslim, redirecting to blocking page
        $scope.muslimTrue = function() {
            $timeout(function() {
                $location.path('/age-gate-block'); 
            }, 1000);
        }

        $scope.submitMobile = function() {
            $location.path('/landing');
        };;

        // Getting countries list for both desktop and mobile
        $http.get('age_country.json').then(function(res) {
            $scope.countries = res.data;
        });

        /* 
         * submitting for MOBILE from here , all comment should be deleted
         */

        // submit agegate form - mobile
        $scope.submitFormMobile = function(legalAge, mbday) {
            // getting legal age and user's bday info
            var val = mbday.split("-");
            var day = parseInt(val[2]);
            var month = parseInt(val[1] - 1);
            var year = parseInt(val[0]);
            var min_age = legalAge;

            console.log('born in ',parseInt(val[0]));

            var userLegalYear = parseInt(val[0]) + parseInt(min_age);

            console.log('m.legal year', userLegalYear);

            var theirDate = new Date((userLegalYear), month, day);
            var today = new Date;
            var thisYear = today.getYear() + 1900;

            console.log('m.exact legal date',new Date((userLegalYear), month, day));

            if((today.getYear() - theirDate.getYear()) < 0 ) {
                console.log('drink fanta');
                $timeout(function() {
                    $location.path('/age-gate-block'); 
                }, 1000);
            } else if (today.getYear() - theirDate.getYear() == 0 ) {
                console.log('this year you will have blast!, BUT this month', today.getMonth() + 1,'wait till ',theirDate.getMonth() +1);
                if(today.getMonth() - theirDate.getMonth() == 0) {
                    console.log('almost ! ');
                    if(today.getDate() - theirDate.getDate() < 0) {
                        console.log('few more days ! ');
                        $timeout(function() {
                            $location.path('/age-gate-block'); 
                        }, 1000);
                    } else {
                        console.log('hooray! go get your drink');
                        $timeout(function() {
                            $location.path('/landing'); 
                        }, 1000);
                    }
                } else if(today.getMonth() - theirDate.getMonth() < 0){
                    console.log('few more months ! ');
                    $timeout(function() {
                        $location.path('/age-gate-block'); 
                    }, 1000);
                }
            } else {
                console.log("hooray! go get your drink");
                $timeout(function() {
                    $location.path('/redirecting'); 
                }, 1000);
            }
        }

        /* 
         * submitting for DESKTOP from here , all comment should be deleted
         */
        // getting age - desktop
        $scope.getAge = function(age, cName) {
            // closing list 
            $scope.listdown = 'false';
            // selected country and age value
            $scope.country = cName;
            $scope.age = age;

            console.log(age,'|',cName);
        }

        // submit agegate form - desktop
        $scope.submitFormDesktop = function(bday) {
            // getting user's birthday
            var val = bday.split("-");

            var year = parseInt(val[2]);
            var month = parseInt(val[1] - 1);
            var day = parseInt(val[0]);
            var min_age = $scope.age;
            
            var userYear = parseInt(val[2]) + parseInt(min_age);

            console.log('just user year +++++', userYear);
            console.log('user bday y/m/d', val[2],val[1],val[0]);

            var theirDate = new Date((userYear), month, day);
            var today = new Date;
            var thisYear = today.getYear() + 1900;

            console.log('their legal date',new Date((userYear), month, day));

            console.log('available year : ', parseInt(val[2]) + parseInt(min_age));

            if((today.getYear() - theirDate.getYear()) < 0 ) {
                console.log('no alcohol');
                $timeout(function() {
                    $location.path('/age-gate-block'); 
                }, 1000);
            } else if (today.getYear() - theirDate.getYear() == 0 ) {
                console.log('this year you will have blast!, BUT', today.getMonth() + 1,theirDate.getMonth() +1);
                if(today.getMonth() - theirDate.getMonth() == 0) {
                    console.log('almost !!!!');
                    if(today.getDate() - theirDate.getDate() < 0) {
                        console.log('few more days ! ');
                        $timeout(function() {
                            $location.path('/age-gate-block'); 
                        }, 1000);
                    } else {
                        console.log('hooray! go get your drink');
                        $timeout(function() {
                            $location.path('/landing'); 
                        }, 1000);
                    }
                } else if(today.getMonth() - theirDate.getMonth() < 0){
                    console.log('few more months ! ');
                    $timeout(function() {
                        $location.path('/age-gate-block'); 
                    }, 1000);
                }
            } else {
                console.log("hooray! go get your drink");
                $timeout(function() {
                    $location.path('/redirecting'); 
                }, 1000);
            }
        }        
    }
])
.controller('TestViewCtrl', ['$scope', 
    function($scope) {
        console.log('TestViewCtrl');
    }
]);