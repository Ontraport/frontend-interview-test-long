'use strict';

module.exports = function(app) {
  app.controller('userController', ['$scope', '$http', function($scope, $http) {
    $scope.displayUser2 = false;
    $scope.displayAllUsers2 = false;
    $scope.displayAllComments2 = false;
    $scope.showResource = false;

    $scope.displayUser = function() {
      $http({
        method: 'GET',
        url: '/user/5'
      }).success(function(data) {
        $scope.data = data;
        $scope.displayUser2 = true;
      }).error(function() {
        return console.log('unable to find info');
      });
    };

    $scope.displayAllUsers = function() {
      $http({
        method: 'GET',
        url: '/users/10'
      }).success(function(data) {
        $scope.allUsers = data;
        $scope.displayAllUsers2 = true;
      }).error(function() {
        return console.log('unable to find info');
      });
    };

    $scope.displayAllComments = function() {
      $http({
        method: 'GET',
        url: '/posts/10'
      }).success(function(data) {
        $scope.allComments = data;
        // $scope.allReplies = data.comments;
        $scope.displayAllComments2 = true;
      }).error(function() {
        return console.log('unable to find info');
      });
    };

    $scope.addResource = function(userId, content) {
      $http({
        method: 'POST',
        url: 'post/' + userId,
        data: {cnt: content}
      }).success(function(data) {
        $scope.postData = data;
        // $scope.cnt.push;
      }).error(function() {
        return console.log('unable to add comment');
      });
    };

    $scope.showAddResource = function() {
      $scope.showResource = true;
      // var code = (e.keyCode ? e.keyCode : e.which);
      // if (code == 13) {
      //   $scope.showResource = false;
      // }else {
      //   $scope.showResource = true;
      // }
    };
  }]);
};
