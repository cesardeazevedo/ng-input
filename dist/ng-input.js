/*!
 * ng-input
 * 
 * Author: Cesar Augusto d. Azevedo <cesardeazevedo@outlook.com>
 * Version: 0.0.8 - 2015-08-29T19:49:38.871Z
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
              , ngPattern:   '@'
              , ngChange:    '&ngChange'
              , ngRequired:  '='
              , ngMinlength: '='
              , ngMaxlength: '='
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

                    scope.$watch(function(){ return scope.input.val(); }, function(newValue){
                        onInputChange();
                    });

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

angular.module("ngInput").run(["$templateCache", function($templateCache) {$templateCache.put("ng-input.html","<span class=\"input input--{{ theme }}\"><input class=\"input__field input__field--{{ theme }}\" type=\"{{type}}\" name=\"{{name}}\" ng-minlength=\"ngMinlength\" ng-maxlength=\"ngMaxlength\" ng-required=\"ngRequired\" ng-pattern=\"ngPattern\" ng-change=\"ngChange()\" ng-trim=\"ngTrim\" ng-model=\"ngModel\"> <label class=\"input__label input__label--{{ theme }} input__label--{{ theme }}-color-{{ color }}\" data-content=\"{{ label }}\"><i ng-if=\"icon\" class=\"{{ icon }}\"></i><svg ng-if=\"theme === \'madoka\'\" class=\"graphic graphic--madoka\" width=\"100%\" height=\"100%\" viewbox=\"0 0 404 77\" preserveaspectratio=\"none\"><path d=\"m0,0l404,0l0,77l-404,0l0,-77z\"></path></svg><span class=\"input__label-content input__label-content--{{ theme }}\" data-content=\"{{ label }}\">{{ label }}</span></label><svg ng-if=\"theme === \'kozakura\'\" class=\"graphic graphic--kozakura\" width=\"300%\" height=\"100%\" viewbox=\"0 0 1200 60\" preserveaspectratio=\"none\"><path d=\"M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z\"></path></svg><svg ng-if=\"theme === \'nao\'\" class=\"graphic graphic--nao\" width=\"300%\" height=\"100%\" viewbox=\"0 0 1200 60\" preserveaspectratio=\"none\"><path d=\"M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0\"></path></svg><svg ng-if=\"theme === \'shoko\'\" class=\"graphic graphic--shoko\" width=\"300%\" height=\"100%\" viewbox=\"0 0 1200 60\" preserveaspectratio=\"none\"><path d=\"M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0\"></path><path d=\"M0,2.5c0,0,298.666,0,399.333,0C448.336,2.5,513.994,13,597,13c77.327,0,135-10.5,200.999-10.5c95.996,0,402.001,0,402.001,0\"></path></svg></span>");}]);