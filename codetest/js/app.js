(function() {

  'use strict';

  // Module declaration and dependencies
  var app = angular.module('app', ['ngStorage','users', 'posts', 'comments']);
  app.controller('dataStorage', function($scope, $http, $localStorage) {

    $scope.$storage = $localStorage.$default({users: [], posts: []});
    $scope.dataPlug = $scope.$storage;


    $scope.showUpdateForm = function() {
        $('#postUpdateWrapper').toggle();
    };

    $scope.hideForm = function() {
        $('#postUpdateWrapper').toggle();      
    };

  });


})();