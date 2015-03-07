'use strict';

app.controller('NavCtrl', function($scope, Post, ModalService) {

    //shows the modal
    $scope.show = function() {

        ModalService.showModal({
            templateUrl: "views/modal.html",
            controller: "ModalCtrl"
        }).then(function(modal) {
            // The modal object has the element built
            modal.element.modal();
            //wait for modal to close before calling submit Post
            //to prevent JavaScript conflicts
            modal.close.then(function(result) {
                $scope.submitPost(result.postContent);
            });
        });

    };

    $scope.post = {
        userId: 5,
        date: '',
        content: '',
        comments: [{
            userId: 3,
            date: "",
            content: "Would you happen to know were Capone is? Since you are a secret agent and all"
        }, {
            userId: 4,
            date: "",
            content: "Would you happen to know were Capone is? Since you are a secret agent and all"
        }],
    };

    //format date for posts
    var formatDate = function(dt) {
        var dd = dt.getDate();
        var mm = dt.getMonth() + 1;
        var yyyy = dt.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
    };

    /* SUBMIT POSTS */
    $scope.submitPost = function(content) {
        $scope.post.date = formatDate(new Date());
        $scope.post.content = content;
        //$scope.posts.push($scope.post);
        //create post using Firebase create method (see services/posts.js)
        Post.create($scope.post).then(function() {
            //reset post after promise returned
            $scope.post = {
                userId: 5,
                date: '',
                content: '',
                comments: []
            };
        });
    };

});
