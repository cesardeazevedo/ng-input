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
