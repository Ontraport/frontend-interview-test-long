(function() {

	var app = angular.module('NetworkEngine', []);   

	app.controller('UserController', function($scope, $http) {

		$http({ method: 'GET', url: 'data/users.json' }).success(function (data) {
			$scope.users = data; // response data 
			user_id = $scope.users.id;
			$scope.get_feed();
		}).
		error(function (data) {
			console.log(data);
		});
				
				
		$scope.get_feed = function() {
			$http({ method: 'GET', url: 'data/posts.json' }).success(function (data) {
				$scope.posts = data; // response data 
				poster_id = $scope.posts.userId;	
				$scope.collect_user_info();
							
			}).
			error(function (data) {
				console.log(data);
			});
		}
				
		$scope.collect_user_info = function() {
			var users_info = [];
					
			angular.forEach($scope.users, function(user) {
				var user_id = user.id,
				user_name = user.username,
				user_avatar = user.pic,
				user_info = {};
				user_info.userId = user_id,
				user_info.username = user_name,
				user_info.pic = user_avatar;
				users_info.push(user_info);
			});
			$scope.display_users_info(users_info);
		}
		$scope.display_users_info = function(users_info) {
			
			angular.forEach($scope.posts, function(post) {
				//Iterating over posts
				var user_id = post.userId;
				
				angular.forEach(post.comments, function(comment) {
					// Iterating over post comments
					var commenter_id = comment.userId;
					angular.forEach(users_info, function(user_info) {
						if(commenter_id == user_info.userId) {
							comment.pic = user_info.pic;
							comment.username = user_info.username;
						}
					});
				});
				
				angular.forEach(users_info, function(user_info) {
					if(user_id == user_info.userId) {
						post.pic = user_info.pic;
						post.username = user_info.username;
					}
				});
			});
			
		}
	});

})();