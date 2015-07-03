/*!
 * ng-input
 * 
 * Author: Cesar Augusto d. Azevedo <cesardeazevedo@outlook.com>
 * Version: 0.0.1 - 2015-07-03T17:37:27.196Z
 * License: MIT
 */


'use strict';

(function(){
    angular.module('ng-input', [])
    .directive('ngInput', ngInput);

    ngInput.$inject = ['$compile'];
    function ngInput($compile){

        var uniqueId = 0;
        return {
            restrict: 'E'
          , replace: true
          , templateUrl: 'src/ng-input.html'
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
          , controller: controller
        };

        function compile(scope, element, attributes){

            return {
                post: function(scope, element, attributes){

                    scope.input = element.find('input');
                    scope.label = element.find('label');

                    var item = 'input_' + uniqueId++;

                    scope.input.attr('id' , item);
                    scope.label.attr('for', item);

                }
            };
        }

        function controller($scope, $element){

            var input = $element.find('input')[0];

            if(input.value.trim() !== '')
                $element.addClass('input--filled');

            input.addEventListener('focus', onInputFocus);
            input.addEventListener('blur', onInputBlur);

            function onInputFocus(){
                $element.addClass('input--filled');
            }

            function onInputBlur(){
                if(input.value.trim() === '')
                    $element.removeClass('input--filled');
            }
        }
    }
})();

angular.module("ng-input").run(["$templateCache", function($templateCache) {$templateCache.put("ng-input.html","<span class=\"input input--{{ theme }}\"><input class=\"input__field input__field--{{ theme }}\" type=\"{{type}}\" name=\"{{name}}\" ng-minlength=\"ngMinlength\" ng-maxlength=\"ngMaxlength\" ng-required=\"ngRequired\" ng-pattern=\"ngPattern\" ng-charge=\"ngCharge\" ng-trim=\"ngTrim\" ng-model=\"ngModel\"> <label class=\"input__label input__label--{{ theme }} input__label--{{ theme }}-color-1\"><span class=\"input__label-content input__label-content--{{ theme }}\">{{ label }}</span></label></span>");}]);