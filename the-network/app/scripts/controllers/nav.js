'use strict';

app.controller('NavCtrl', function($scope, Post) {
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
        //create post using Firebase create method (see services/posts.js)
        Post.create($scope.post).then(function() {
            //reset post after promise returned
            $scope.post = {
                userId: 5,
                date: '',
                content: '',
                comments: ['']
            };
        });
    };

});
