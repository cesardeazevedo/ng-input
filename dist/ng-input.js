/*!
 * ng-input
 * 
 * Author: Cesar Augusto d. Azevedo <cesardeazevedo@outlook.com>
 * Version: 0.0.1 - 2015-07-04T07:57:30.987Z
 * License: MIT
 */


'use strict';

(function(){
    angular.module('ng-input', [])
    .directive('ngInput', ngInput);

    ngInput.$inject = [];
    function ngInput(){

        var uniqueId = 0;
        return {
            restrict: 'E'
          , replace: true
          , templateUrl: 'ng-input.html'
          , scope: {
                theme:       '@'
              , type:        '@'
              , label:       '@'
              , name:        '@'
              , ngRequired:  '='
              , ngMinlength: '='
              , ngMaxlength: '='
              , ngPattern:   '='
              , ngCharge:    '='
              , ngTrim:      '='
              , ngModel:     '='
            }
          , compile: compile
        };

        function compile(){

            return {
                post: function(scope, element){

                    scope.input = element.find('input');
                    scope.label = element.find('label');

                    var item       = 'input_' + uniqueId++
                      , inputClass = 'input--filled';

                    scope.input.attr('id' , item);
                    scope.label.attr('for', item);

                    onInputChange();
                    scope.input.bind('focus', onInputFocus);
                    scope.input.bind('blur', onInputBlur);

                    //To detect browser autofill
                    scope.input.bind('change', onInputChange);

                    function onInputChange(){
                        if(scope.input.val().trim() !== '')
                            addClass();
                    }

                    function onInputFocus(){
                        addClass();
                    }

                    function onInputBlur(){
                        if(scope.input.val().trim() === '')
                            removeClass();
                    }

                    function addClass(){
                        element.addClass(inputClass);
                    }

                    function removeClass(){
                        element.removeClass(inputClass);
                    }

                }
            };
        }
    }
})();

angular.module("ng-input").run(["$templateCache", function($templateCache) {$templateCache.put("ng-input.html","<span class=\"input input--{{ theme }}\"><input class=\"input__field input__field--{{ theme }}\" type=\"{{type}}\" name=\"{{name}}\" ng-minlength=\"ngMinlength\" ng-maxlength=\"ngMaxlength\" ng-required=\"ngRequired\" ng-pattern=\"ngPattern\" ng-charge=\"ngCharge\" ng-trim=\"ngTrim\" ng-model=\"ngModel\"> <label class=\"input__label input__label--{{ theme }} input__label--{{ theme }}-color-1\"><span class=\"input__label-content input__label-content--{{ theme }}\">{{ label }}</span></label></span>");}]);