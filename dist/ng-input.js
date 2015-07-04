/*!
 * ng-input
 * 
 * Author: Cesar Augusto d. Azevedo <cesardeazevedo@outlook.com>
 * Version: 0.0.2 - 2015-07-04T23:51:08.473Z
 * License: MIT
 */


'use strict';

(function(){
    angular.module('ngInput', [])
    .directive('ngInput', ngInput);

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
              , icon:        '@'
              , color:       '@'
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
                post: function(scope, element, attributes){

                    scope.input = element.find('input');
                    scope.label = element.find('label');

                    //Default options
                    attributes.theme = attributes.theme || 'kaede';
                    attributes.type  = attributes.type  || 'text';
                    attributes.color = attributes.color || '1';

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

angular.module("ngInput").run(["$templateCache", function($templateCache) {$templateCache.put("ng-input.html","<span class=\"input input--{{ theme }}\"><input class=\"input__field input__field--{{ theme }}\" type=\"{{type}}\" name=\"{{name}}\" ng-minlength=\"ngMinlength\" ng-maxlength=\"ngMaxlength\" ng-required=\"ngRequired\" ng-pattern=\"ngPattern\" ng-charge=\"ngCharge\" ng-trim=\"ngTrim\" ng-model=\"ngModel\"> <label class=\"input__label input__label--{{ theme }} input__label--{{ theme }}-color-{{ color }}\" data-content=\"{{ label }}\"><i ng-if=\"icon\" class=\"{{ icon }}\"></i><svg ng-if=\"theme === \'madoka\'\" class=\"graphic graphic--madoka\" width=\"100%\" height=\"100%\" viewbox=\"0 0 404 77\" preserveaspectratio=\"none\"><path d=\"m0,0l404,0l0,77l-404,0l0,-77z\"></path></svg><span class=\"input__label-content input__label-content--{{ theme }}\">{{ label }}</span></label></span>");}]);