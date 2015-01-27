'use strict';

/* Controllers */

var ontraportApp = angular.module('ontraportApp', []);

// controller to load data
ontraportApp.controller('dataCtrl', ['$scope', '$http', function($scope, $http) {

 // fetch data from posts.json and store in scope
  $http.get('data/posts.json').success(function(data) {
    $scope.posts = data;
  });
  // fetch data from users.json and store in scope
  $http.get('data/users.json').success(function(data) {
    $scope.users = data;
  });


}]);

// controller to handle making new posts
ontraportApp.controller('postController', ['$scope',
    function($scope) {//same procedure as above
        $scope.newPost = function($event,posts) {
            if ($event.which == "13") {
                $event.preventDefault(); // enter button posts instead of making new line
                // grab post content from modal text area
                var post_content = $('textarea#newPost').val(); 
                // if text is in text area
                if (post_content != null && post_content !=
                    "") {
                	
                	var highPost = 0;
                	// push new post to posts object
                    posts.push({
                        "id": highPost + 1,
                        "userId": 5,
                        "date": "",
                        "content": post_content,
                        "comments": []
                    });
                   
                    $('#myModal').modal('hide'); // hide the modal
                     $('textarea#newPost').val(''); // then clear the textarea
                }
                // else alert user that they can't post blank posts
                 else{alert("Must have content to post!");}
            }
        }
    }
]); 


// controller to handle posting comments 
ontraportApp.controller('commentController', ['$scope',
    function($scope) {
        $scope.newComment = function($event, post, postIndex) {
            if ($event.which == "13") { // fire when enter key is pressed 
                $event.preventDefault();// no nextline when enter is pressed
                if ($scope.comment != null && $scope.comment !=
                    "") {
                    var comments = $scope.posts[postIndex].comments; // pull in comments from given post
                    var numComments = [];
                    for(var i=0; i<comments.length; i++){ // loop thru all comments in post and store in array
                        numComments.push(comments[i].id);
                    }
                    var currentCommentPosition = Math.max.apply(Math, numComments); // find "most recent" comment via highest ID
                    // above function will return -Infinity on empty array, make current position 0 if case
	                    if (currentCommentPosition == "-Infinity") {
	                        currentCommentPosition = 0;
	                    }
                    $scope.posts[postIndex].comments.push({//push the new comment to the data in comment format
                        "id": currentCommentPosition + 1,
                        "postId": post.id,
                        "userId": 5 ,
                        "date": "",
                        "content": $scope.comment
                    });
                    $scope.comment = null;//empty the textarea after the comment is inserted
                }
            }

        }
    }
]); 
