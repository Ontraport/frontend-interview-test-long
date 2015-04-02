/**
 * Created by Hamster on 3/21/2015.
 */
'use strict'


var ontraContollers = angular.module('OntraApp.controllers', []);

//controller for main ticker page
ontraContollers.controller('TickerController', ['$scope', 'UserService', 'PostService',
		function ($scope, UserService, PostService)
		{
			//bound values
			$scope.users = UserService.users;
			$scope.userImageURL = $scope.users[UserService.getCurrentUser()].pic;
			$scope.userName = $scope.users[UserService.getCurrentUser()].username;
			$scope.postSets = [PostService.posts, PostService.localPosts];
			
			/*
			* Add post from comment box by pressing enter
			* */
			$scope.submitComment = function(keyEvent, postId, content)
			{
				if (keyEvent.which === 13)
				{
					PostService.addComment(UserService.getCurrentUser(), postId, content.content);
					content.content = "";
				}
			}
		}]
);

//Controller for layout header
ontraContollers.controller('HeaderController',
	['$scope', '$modal', 'UserService',
		function ($scope, $modal, UserService)
		{
			$scope.users = UserService.users;
			
			/*
			* opens new post modal open
			* called when Submit Post is pressed
			* */
			$scope.openPostModal = function ()
			{
				$modal.open({
					templateUrl: 'views/post-modal.html',
					controller: 'PostModalController',
					windowClass: 'postModelWindow',
					resolve: {
						currentUser: function ()
						{
							return UserService.getCurrentUser();
						}
					}
				})
			}
			//only one page so no binding for home
		}
	]
);

//modal window controller
ontraContollers.controller('PostModalController',
	['$scope', '$modalInstance', 'PostService', "currentUser",
		function ($scope, $modalInstance, PostService, currentUser)
		{
			//bound variables;
			$scope.postInput = "";
			$scope.currentUser = currentUser;

			/*
			* enter pressed on modal window
			* submits new post
			* */
			$scope.postModalKeyPress = function (keyEvent)
			{
				if (keyEvent.which === 13)
				{
					submitPost();
				}
			};

			//set initial focus
			$("#postModalInput").focus();

			/*
			* submit a new post
			* closes modal window
			* */
			function submitPost()
			{
				PostService.makeLocalPost($scope.currentUser, $scope.postInput);

				$modalInstance.dismiss('submitted post');
			}

		}
	]
);

//helper directive to focus textarea when modal window opened
ontraContollers.directive('focusMe', function ($timeout)
{
	return {
		scope: {trigger: '@focusMe'},
		link: function (scope, element)
		{
			scope.$watch('trigger', function (value)
			{
				if (value === "true")
				{
					$timeout(function ()
					{
						element[0].focus();
					});
				}
			});
		}
	};
});

//controller to clear local storage
ontraContollers.controller('ClearController',
	['$location', '$timeout',
		function ($location, $timeout)
		{
			$timeout(function(){
				
				$location.path('./#/ticket');
			}, 1000);
			$.jStorage.flush();
			
		}]);