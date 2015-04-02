/**
 * Created by Hamster on 3/21/2015.
 */
'use strict'


var ontraContollers = angular.module('OntraApp.controllers', []);

ontraContollers.controller('TickerController', ['$scope', 'UserService', 'PostService',
		function ($scope, UserService, PostService)
		{

			$scope.users = UserService.users;


			/*var callUsers = function(rUser)
			 {
			 /!*$scope.users = [];
			 for (var key in response)
			 {
			 $scope.users[response[key].id] = response[key];

			 }*!/
			 $scope.users = rUser;

			 };*/
			//UserService.getUsers(callUsers)//TODO add failures here later
			$scope.userImageURL = $scope.users[UserService.getCurrentUser()].pic;
			$scope.userName = $scope.users[UserService.getCurrentUser()].username;
			$scope.postSets = [PostService.posts, PostService.localPosts];
			
			$scope.submitComment = function(keyEvent, postId, content)
			{
				if (keyEvent.which === 13)
				{
					PostService.addComment(UserService.getCurrentUser(), postId, content.content);
					console.log(content.content);
					content.content = "";
				}
			}

		}]
);


ontraContollers.controller('HeaderController',
	['$scope', '$modal', 'UserService',
		function ($scope, $modal, UserService)
		{
			$scope.users = UserService.users;
			console.log(UserService);
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

		}
	]
);

ontraContollers.controller('PostModalController',
	['$scope', '$modalInstance', 'PostService', "currentUser",
		function ($scope, $modalInstance, PostService, currentUser)
		{
			$scope.postInput = "";
			$scope.currentUser = currentUser;

			$scope.hamKeyPress = function (keyEvent)
			{
				if (keyEvent.which === 13)
				{
					submitPost();
				}
			};

			$("#postModalInput").focus();

			function submitPost()
			{
				console.log('submitting post' + $scope.postInput);

				PostService.makeLocalPost($scope.currentUser, $scope.postInput);

				$modalInstance.dismiss('submitted post');
			}

		}
	]
);

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

ontraContollers.controller('ClearController',
	['$location',
		function ($location)
		{
			$.jStorage.flush();
			$location.path('./#/ticket');
		}]);