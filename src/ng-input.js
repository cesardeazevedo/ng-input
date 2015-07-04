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
