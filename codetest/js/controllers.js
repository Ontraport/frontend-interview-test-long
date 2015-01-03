var postControllers = angular.module('postControllers', ['ngDialog']); //create a module for all of the controllers
postControllers.controller('dataController', ['$scope', '$http', 'dataService',
    function($scope, $http, dataService) { //create a controller to gather the data
        dataService.asyncPostData().then(function() { //wait for the data to finish loading
            $scope.postObj = dataService.postData();//place the data on the postObj variable
            if (Box.isset('posts')) {//check if the any posts have been saved to Local Storage
                var localPosts = Box.fetch('posts');//if there are any posts save to localPosts variable
                for (localPost in localPosts) { //loop through each post in localPosts
                    $scope.postObj.push(localPosts[localPost]); //append it to the original posts data
                }
            }
            if (Box.isset('comments')) { //check if any comments have been saved to Local Storage
                var localComments = Box.fetch('comments');//if any, store them in localComments variable
                for (localComment in localComments) { //loop through each comment in localComments
                    for (post in $scope.postObj) { //for each post in postObj variable
                        if ($scope.postObj[post].id ==
                            localComments[localComment].postId) {//if the post's 'id' matches the comment's 'postId'
                            $scope.postObj[post].comments.push( //append the comment to the end of the matching post's object
                                localComments[localComment]
                            );
                        }
                    }
                }
            }
        });
        dataService.asyncUserData().then(function() { //wait for user data to finish loading
            $scope.users = dataService.userData(); //place the data in the users variable
        });
    }
]); //end of dataController
postControllers.controller('userController', ['$scope', 'User', 'dataService',
    function($scope, User, dataService) {//controller to get the user data
        dataService.asyncUserData().then(function() {//wait for the data to finish loading
            $scope.curUser = User.currentUser;//get the current user from the user service
            var users = dataService.userData();//place the data on the users variable
            var userData = users.filter(function(user) {//use filter function to get data from the current user
                return user.id == $scope.curUser//by default, the filter function returns an object according to the matching id
            });
            $scope.userData = userData;//place the object on the userData variable
        });
    }
]); //end of userController
postControllers.controller('postCommentController', ['$scope', 'User',
    function($scope, User) {//create a controller for posting a comment
        if (Box.isset('comments')) {//if there are any comments in the local storage
            var localComments = Box.fetch('comments');//place the comments on the localComments array
        } else {//if there are no comments in local storage
            var localComments = [];//create an empty array to store it later
        }
        $scope.postComment = function($event, post, postIndex) {//create the function to post the comment and call it on keypress
            if ($event.which == "13") {//if the enter key was pressed
                $event.preventDefault();//prevent the textarea from going to the next line
                if ($scope.commentValue != null && $scope.commentValue !=
                    "") {//if the textarea is not empty
                    var comments = $scope.postObj[postIndex].comments;//put the new comment on the comments variable
                    var commentIds = [];//create an empty array to hold all of the comments ID's
                    for (comment in comments) {//loop through the coments
                        commentIds.push(comments[comment].id);//push all of the ID's to the commentIds variable
                    }
                    var highestComment = Math.max.apply(Math,
                        commentIds);//calculate what is the ID in the array with the highest value
                    if (highestComment == "-Infinity") {//if the post has no comments, it will return "-Infinity"
                        highestComment = 0;//since the post has no comments, the highest comment will be 0
                    }
                    $scope.postObj[postIndex].comments.push({//push the new comment to the data
                        "id": highestComment + 1,
                        "postId": post.id,
                        "userId": User.currentUser,
                        "date": "",
                        "content": $scope.commentValue
                    });
                    localComments.push({//also push the new comment to the local storage variable
                        "id": highestComment + 1,
                        "postId": post.id,
                        "userId": User.currentUser,
                        "date": "",
                        "content": $scope.commentValue
                    });
                    Box.store('comments', localComments);//finally send the variable to local storage 
                    $scope.commentValue = null;//empty the textarea after the comment is inserted
                }
            }
        }
    }
]); //end of postCommentController
postControllers.controller('newPostController', ['$scope', 'User', 'ngDialog',
    'dataService',
    function($scope, User, ngDialog, dataService) {//same procedure as above
        if (Box.isset('posts')) {
            var localPosts = Box.fetch('posts');
        } else {
            var localPosts = [];
        }
        $scope.openLightbox = function() {
            ngDialog.open({
                template: 'templateId',
                className: 'ngdialog-theme-default new-post',
                controller: 'newPostController'
            });
        }
        $scope.newPost = function($event) {
            if ($event.which == "13") {
                $event.preventDefault();
                if ($scope.postData != null && $scope.postData !=
                    "") {
                    var posts = dataService.postData();
                    var postIds = [];
                    for (post in posts) {
                        postIds.push(posts[post].id);
                    }
                    var highestPost = Math.max.apply(Math, postIds);
                    console.log(highestPost);
                    if (highestPost == "-Infinity") {
                        highestPost = 0;
                    }
                    dataService.postData().push({
                        "id": highestPost + 1,
                        "userId": User.currentUser,
                        "date": "",
                        "content": $scope.postData,
                        "comments": []
                    });
                    localPosts.push({
                        "id": highestPost + 1,
                        "userId": User.currentUser,
                        "date": "",
                        "content": $scope.postData,
                        "comments": []
                    });
                    Box.store('posts', localPosts);
                    $scope.postData = null;
                    ngDialog.closeAll();
                }
            }
        }
    }
]); //end of newPostController