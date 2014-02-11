'use strict';

/* App Module */
var app = angular.module('testApp', [
    'ngRoute',
    'ngControllers',
    'ngAnimate',
    'infinite-scroll'
]);

app.run(['$location', '$rootScope', '$timeout', function($location, $rootScope, $timeout) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        // metadata
        $rootScope.title = current.$$route.title;
        $rootScope.keywords = current.$$route.keywords;        
        $rootScope.description = current.$$route.description;

        // Hidden footer effect on main page
        if($location.path() == '/') {
            $rootScope.hideFooter = true;
        } else {
            $rootScope.hideFooter = false;
        }
        // play video button for mobile version
        if($location.path() == '/made-of-more') {
            $rootScope.hidePlayerBtn = false;
        } else {
            $rootScope.hidePlayerBtn = true;
        }

        if($location.path() == '/landing') {
            // console.log('location path');

            // var _giphy = _giphy || []; 
            // _giphy.push({id: 'ArJIdoKqGR3Ec',w: 500, h: 500});
            // var g = document.createElement('script');


            // g.type = 'text/javascript'; 
            // g.async = true;
            // g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'giphy.com/static/js/widgets/embed.js';


            // console.log('func');

            // var s = document.getElementsByTagName('script')[0]; 
            // console.log('ssssss',s);
            // s.parentNode.insertBefore(g, s);


        }
    });
}]);

app.run(function($rootScope, $window) {
    // publish current transition direction on rootScope

    $rootScope.direction = 'left';

    // listen change start events
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        $rootScope.direction = 'right';

        // console.log(arguments);

        // transition effect for individual pages
        if (current && next && (current.depth > next.depth)) {
            // This is only for main page to landing page: up and down 
            // except this page every page will only have left or right side transition effect
            if ((current.depth == 2) && (next.depth == 1)) {
                $rootScope.direction = 'up';  
            } else {
                $rootScope.direction = 'left';  
            }
        } else if (current && next && (current.depth == 1 && next.depth == 2)) {
            $rootScope.direction = 'down';  
        }
        // back
        $rootScope.back = function() {
          $window.history.back();
        }
    });
});

app.config(function($routeProvider) {
$routeProvider
	.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        depth: 1,
        title: 'Test | Main',
        keywords: 'test, main',
        description: 'test, main'
    })
    // Age gate
    .when('/age-gate', {
        templateUrl: 'views/age-gate.html',
        controller: 'AgeGateCtrl',
        depth: 2,
        title: '',
        keywords: '',
        description: ''
    })
    // when user is muslim or underage, goes to this page.
    .when('/age-gate-block', {
        templateUrl: 'views/age-gate-block.html',
        controller: 'AgeGateBlockCtrl',
        depth: 3,
        title: '',
        keywords: '',
        description: ''
    })
    // after age-gate redirecting page
    .when('/redirecting', {
        templateUrl: 'views/redirecting.html',
        controller: 'RedirectingCtrl',
        depth: 3,
        title: '',
        keywords: '',
        description: ''
    })
    // landing page, video shoudlnt be loaded when device is mobile device
    .when('/landing', {
        templateUrl: 'views/landing.html',
        controller: 'LandingPageCtrl',
        depth: 4,
        title: '',
        keywords: '',
        description: ''
    })
    .when('/made-of-more', {
        templateUrl: 'views/made-of-more.html',
        controller: 'MadeofmorePageCtrl',
        depth: 5,
        title: '',
        keywords: '',
        description: ''
    })
    .when('/behind-the-scene', {
        templateUrl: 'views/behind-the-scene.html',
        controller: 'BehindTheSceneCtrl',
        depth: 5,
        title: '',
        keywords: '',
        description: ''
    })
    //  temp as a testing page
    .when('/age-gate-test', {
        templateUrl: 'views/age-gate-test.html',
        controller: 'TestCtrl',
        depth: 2,
        title: '',
        keywords: '',
        description: ''
    })
    //  temp as a texting 8Scrolling
    .when('/8scroll', {
        templateUrl: 'views/test-8scroll.html',
        controller: 'TestInfiniteCtrl',
        depth: 7,
        title: '',
        keywords: '',
        description: ''
    })
	.otherwise({
    	redirectTo: '/'
    });
});
