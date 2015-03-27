/**
 * Created by Hamster on 3/22/2015.
 */

var ontraServices = angular.module('OntraAppServices', []);

ontraServices.factory('UserService', ['$http',
		function ($http)
		{
			var userService = {};
			$http.get('data/users.json').then(function (response)
			{
				for (var key in response.data)
				{
					var user = response.data[key];
					Box.store("user" + user.id, user);
				}
				//Box.loads(response, 'json');
			});
			userService.getUserProfileImageURL = function (id)
			{
				return Box.fetch('user' + id).pic;
			};
			userService.getUserName = function (id)
			{
				return Box.fetch('user' + id).username;
			};
			
			userService.getUsers = function()
			{
				return $http({
						method: 'GET',
						url: 'data/users.json'
					}
				)
			};
			
			userService.getCurrentUser = function()
			{
				return 5;
			}
			return userService;
		}
	]
);

ontraServices.factory('PostService', ['$http',
		function ($http)
		{
			var postService = {gay: 3};
			$http.get('data/posts.json').then(function (response)
			{
				postService.postData = response.data;
				for (var key in response.data)
				{
					var post = response.data[key];
					Box.store("post" + post.id, post);
				}
				//Box.loads(response, 'json');
			});

			postService.getPosts = function ()
			{
				//console.log(postService);
				//return postService.postData;
				return $http({
						method: 'GET',
						url: 'data/posts.json'
					}
				)
			};

			postService.getContent = function (id)
			{
				return Box.fetch("post" + id).content;
			};

			return postService;
		}
	]
);
	

