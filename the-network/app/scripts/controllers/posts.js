'use strict';

app.controller('PostsCtrl', function($scope, Post) {
    $scope.posts = Post.all;
    
    /* DELETE POSTS */
    $scope.deletePost = function(post) {
        //$scope.posts.splice(index, 1);
        Post.delete(post);
    };
});
