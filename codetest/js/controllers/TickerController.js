/**
 * Created by Hamster on 3/21/2015.
 */
'use strict'


var ontraContollers = angular.module('OntraApp.controllers', []);

ontraContollers.controller('TickerController', ['$scope', 'UserService', 'PostService',
		function ($scope, UserService, PostService)
		{
			$scope.userImageURL = UserService.getUserProfileImageURL(UserService.getCurrentUser());
			$scope.userName = UserService.getUserName(UserService.getCurrentUser());
			$scope.users = [];
			UserService.getUsers().success(function (response)
			{
				$scope.users = [];
				for (var key in response)
				{
					$scope.users[response[key].id] = response[key];
				}
				//$scope.users = response;
			});
			$scope.posts = [];
			PostService.getPosts().success(function (response)
			{
				$scope.posts = response;
			});

			console.log($scope.posts);
		}]
);


ontraContollers.controller('HeaderController', ['$scope', 'UserService',
	function ($scope, UserService)
	{
		$scope.profilePic = UserService.getUserProfileImageURL(UserService.getCurrentUser());

	}]);
