'use strict';

app.controller('PostCtrl', function ($scope, $routeParams, Post) {
  $scope.post = Post.get($routeParams.postId);
});