angular.module('app', ['ngInput'])
.controller('AppController',function($scope){
    $scope.change = function(){
        console.log('Chagned 1');
    };
    $scope.change2 = function(){
        console.log('Changed 2');
    };
    $scope.change3 = function(){
        console.log('Changed 3');
    };
});
