(function() {
  var app = angular.module('comments', []);

  app.directive('comments', function() {
    return {
      restrict: 'E',
      templateUrl: 'comments.html',
      controller: function($scope, $http) {

        $scope.newComment = "";

        $scope.getPostId = function (a) {
          $scope.postId = $scope.dataPlug.posts.map(function(e) { return e.id; }).indexOf(a.postId);
        };

        $scope.postComment = function(postId) {

          //get current post id#
          $scope.postId = "";
          $scope.getPostId(postId);

          //Find highest comment id#
          var max = [];
          for (i = 0; i < $scope.dataPlug.posts.length; i++) {
            
            for (e = 0; e < $scope.dataPlug.posts[i].comments.length; e++) {
              max.push($scope.dataPlug.posts[i].comments[e].id);
            };
          };
          $scope.nextCommentId = Math.max.apply(null, max) + 1;

          //push comment
          $scope.dataPlug.posts[$scope.postId].comments.push(
            {
              id: $scope.nextCommentId,
              userId: $scope.loggedKey,
              date: "",
              content: $scope.newComment
            }
          );

          $scope.newComment = "";

        };




      },
      controllerAs: 'commentCtrl'
    };
  });

  })();