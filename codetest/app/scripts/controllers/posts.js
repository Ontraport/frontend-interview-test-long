'use strict';

app.controller('PostsCtrl', function($scope, $routeParams, $http, Post) {
    $scope.posts = Post.all;
    $scope.commentText = '';
    //load user data
    $scope.users = null;
    $http({
        method: 'GET',
        url: '../data/users.json'
    }).
    success(function(data, status, headers, config) {
        $scope.users = data;
    }).error(function(data, status, headers, config) {
        console.log('error');
    });

    /* DELETE POSTS */
    $scope.deletePost = function(post) {
        //$scope.posts.splice(index, 1);
        Post.delete(post);
    };

    //Method to add a comment to post
    $scope.addComment = function(postId, post, content, i) {
        var comments = Post.comments(postId);
        var date = new Date();
        if (!content || content === '') {
            return;
        }
        var comment = {
            postId: postId,
            userId: 5,
            date: date,
            content: content
        };
        if (post.comments[0] === '') {
            post.comments[0] = comment;
        } else {
            post.comments.push(comment);
        }
        //reset comment to empty
        document.getElementById(postId + i).value = "";
        $scope.commentText = '';
        //comments.$add(comment);

    };

    //Method to delete a comment from post
    $scope.deleteComment = function(index, post) {
        post.comments.splice(index, 1);
    };
});
