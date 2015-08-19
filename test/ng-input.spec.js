'use strict';

describe('ng-input', function() {

    var scope, element, $compile;

    function create(html){
        var compile;
        element = angular.element(html);
        compile = $compile(html)(scope);
        scope.$digest();
        return compile;
    }

    beforeEach(module('ngInput'));

    beforeEach(inject(function(_$rootScope_, _$compile_){
        scope = _$rootScope_;
        $compile = _$compile_;
        create(element);
    }));

    it('Expect hoshi theme', function(done){
        var html = '<ng-input theme="hoshi"></ng-input>';
        create(html);
        expect(element.attr('theme')).toBe('hoshi');
    });

    it('Don`t Expect akira theme', function(done){
        element = create('<ng-input theme="hoshi"></ng-input>');
        expect(element.attr('theme')).not.toBe('akira');
    });

    it('Expect kaede as a default theme', function(done){
        element = create('<ng-input ></ng-input>');
        expect(element.isolateScope().theme).toBe('kaede');
    });

    it('Expect input type text as default input type', function(done){
        element = create('<ng-input ></ng-input>');
        expect(element.isolateScope().type).toBe('text');
    });

    it('Expect input name as username', function(done){
        element = create('<ng-input name="username"></ng-input>');
        expect(element.isolateScope().input.attr('name')).toBe('username');
    });

    it('Should fire the focus event and expect input--filled class', function(done){
        var addedClass = 'input--filled';
        element = create('<ng-input></ng-input>');
        element.isolateScope().input.triggerHandler('focus');
        expect(element.hasClass(addedClass)).toBe(true);
    });

    it('Should fire the focus and blur event and expect doesn\'t have the input--filled class', function(done){
        var addedClass = 'input--filled';
        element = create('<ng-input></ng-input>');
        element.isolateScope().input.triggerHandler('focus');
        element.isolateScope().input.triggerHandler('blur');
        expect(element.hasClass(addedClass)).toBe(false);
    });

    it('Should change ng-model which will be watched insides directives and expect input--filled class ', function(done){
        var value = 'newValue';
        var addedClass = 'input--filled';
        element = create('<ng-input ng-model="first_name"></ng-input>');
        scope.first_name = value;
        scope.$digest();
        expect(element.hasClass(addedClass)).toBe(true);
    });

    it('Should change value with ng-change', function(){
        scope.change = function(){
            scope.first_name = 'newValue';
        };
        element = create('<ng-input ng-model="first_name" ng-change="change()"></ng-input>');
        scope.$digest();
        element.isolateScope().input.val('newValue').triggerHandler('input');
        expect(scope.first_name).toBe('newValue');
    });
});
