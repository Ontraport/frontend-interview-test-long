'use strict';

app.controller('PostsCtrl', function($scope, Post) {
    $scope.posts = Post.get();
    $scope.post = {
        userId: 5,
        date: '',
        content: '',
        comments: ['']
    };

    //format date for posts
    var formatDate = function(dt) {
        var dd = dt.getDate();
        var mm = dt.getMonth() + 1;
        var yyyy = dt.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
    };

    /* SUBMIT POSTS */
    $scope.submitPost = function() {
        $scope.post.date = formatDate(new Date());
        //$scope.posts.push($scope.post);
        //save post to Firebase server
        Post.save($scope.post, function(hashKey) {
            $scope.posts[hashKey.name] = $scope.post;
            //reset post
            $scope.post = {
                userId: 5,
                date: '',
                content: '',
                comments: ['']
            };
        });

    };
    /* DELETE POSTS */
    $scope.deletePost = function(postId) {
        //$scope.posts.splice(index, 1);
        Post.delete({
            id: postId
        }, function() {
            delete $scope.posts[postId];
        });
    };
});
