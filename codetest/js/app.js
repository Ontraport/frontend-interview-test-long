(function() {

  'use strict';

  // Module declaration and dependencies
  var app = angular.module('app', ['ngStorage', 'posts', 'users', 'comments']);
  app.controller('dataStorage', function($scope, $http, $localStorage) {

    $scope.dataPlug = $localStorage.$default({users: [], posts: []});

    $scope.showUpdateForm = function() {
        $('#postUpdateWrapper').toggle();
    };

    $scope.hideForm = function() {
        $('#postUpdateWrapper').toggle();      
    };

  });


})();