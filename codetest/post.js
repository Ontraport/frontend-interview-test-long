var app = angular.module('postApp',['ngResource','ui.bootstrap']);
	
app.controller('postController',function($scope,$modal,postsData,usersData) {
	$scope.loggedInUser = 5;
	$scope.postData = {posts:null,users:null};
	$scope.postData.posts = postsData.query();
	$scope.postData.users = usersData.query();
		
	$scope.profilePic = function(user) {
		for (i=0;i<$scope.postData.users.length;i++) {
			if($scope.postData.users[i].id == user) {
				return $scope.postData.users[i].pic;
			}
		}
	}

	$scope.profileName = function(user) {
		for (i=0;i<$scope.postData.users.length;i++) {
			if($scope.postData.users[i].id == user) {
				return $scope.postData.users[i].username;
			}
		}
	}

	$scope.addNewComment = function(index,id) {
		$scope.postData.posts[index].comments.push({
			"id":14,
			"postId":id,
			userId:$scope.loggedInUser,
			"date":"",
			"content":$scope.newCommentContent[id]
		});
		$scope.newCommentContent[id] = "";
	};

	$scope.addNewPost = function(text) {
		$scope.postData.posts.push({
			"id":8,
			"userId":$scope.loggedInUser,
			"date":"",
			"content":text,
			"comments":[]
		});
		$scope.newPost = "";
		//$scope.toggleModal();
	};

	$scope.open = function() {
		var modalInstance = $modal.open({
	      templateUrl: 'modalContent.html',
	      controller: 'ModalCtrl',
	      size: 'md'
	    });

	    modalInstance.result.then(function (enteredText) {
	        console.log(enteredText);
	        $scope.addNewPost(enteredText);
    	});
    };

	
});

app.factory('postsData',function($resource) {
	return $resource('data/posts.json');
});
app.factory('usersData',function($resource) { 
	return $resource('data/users.json');
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-dialog-content' ng-transclude></div></div></div>" // See below
  };
});

app.controller('ModalCtrl',function($scope,$modalInstance) {
	$scope.ok = function () {
		console.log("I m here");
    	$modalInstance.close($scope.newPost);
  	};
});