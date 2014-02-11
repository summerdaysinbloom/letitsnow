'use strict';

console.log('ddd');

angular.module('ngDirectives', []).directive('whenScrolled', function() {
    return function(scope, elm, attr) {
    	console.log('scope, elm, attr',scope, elm, attr);
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});