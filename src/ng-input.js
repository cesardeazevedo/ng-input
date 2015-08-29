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
