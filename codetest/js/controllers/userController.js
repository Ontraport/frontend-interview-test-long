'use strict';

module.exports = function(app) {
  app.controller('ontraportController', ['$scope', '$http', function($scope, $http) {
    $scope.users = 'hello world';
    // console.log($scope.data);
    $scope.displayUser = function(display) {
      $scope.displayUser(display);
      $http({
        method: 'GET',
        url: '/posts/9'
      }).success(function(data) {
        $scope.users.inf = data;
        console.log($scope.users.inf);
      });
    };
  }]);
};
