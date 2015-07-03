'use strict';

describe('ng-input', function() {

    var scope, element, $httpBackend;

    beforeEach(module('ng-input'));
    beforeEach(module('src/ng-input.html'));

    beforeEach(inject(function(_$rootScope_, _$compile_){

        element = angular.element('<ng-input theme="hoshi"></ng-input>');

        scope = _$rootScope_;
        _$compile_(element)(scope);
        scope.$digest();
    }));
});
