(function() {

  'use strict';

  // Module declaration and dependencies
  var app = angular.module('app', ['ngStorage', 'posts']);
  app.controller('dataStorage', function($scope, $http, $localStorage) {

    $scope.dataPlug = $localStorage.$default({users: [], posts: []});

    $http.get('data/users.json').success(function(data){
        $scope.dataPlug.users = data;
    })
    .error(function(status) {
      console.log("Error: " + status);
    });



    
    $scope.text = '';
    $scope.submit = function() {
      if ($scope.text) {
        var seconds = new Date().getSeconds();
        $scope.postList.push({text: this.text, second: seconds});
        $scope.text = '';
      }
    }

  });


})();