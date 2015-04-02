/**
 * Created by Hamster on 3/22/2015.
 */

var ontraServices = angular.module('OntraApp.services', []);
//service for user info
ontraServices.factory('UserService', ['$http',
		function ($http)
		{
			//users only loaded once and not edited, so it is binded directly
			var userService = {users: [], hamError: ''};

			//load user data
			userService.loadUsers = function ()
			{
				$http({
					method: 'GET',
					url: 'data/users.json'
				}).success(function (response)
					{
						for (var key in response)
						{
							userService.users[response[key].id] = response[key];
						}
					}
				).error(function (data, status, headers, config)
					{
						var err = "Load User Error" + status;
						userService.hamError = err;
						console.log(err);
					})
			};

			userService.loadUsers();

			//current user implemented as function because I dunno
			userService.getCurrentUser = function ()
			{
				return 5;
			};
			return userService;
		}
	]
);

ontraServices.factory('PostService', ['$http',
		function ($http)
		{
			//posts and buffered posts are stored seperately and binded from parent object because they are updated
			var postService = {posts: {data: []}, localPosts: {data: []}, bufferedComments: []};
			var localStored = $.jStorage.get('local_posts', []);
			postService.localPosts.data = localStored;
			var commentStored = $.jStorage.get('bufferedComments', []);
			postService.bufferComments = commentStored;

			/*
			* load comments to posts in json.
			* called when json posts are loaded
			* */
			postService.loadBufferedComments = function ()
			{
				var commentStored = $.jStorage.get('bufferedComments', []);
				postService.bufferComments = commentStored;
				for (var i = 0; i < postService.bufferComments.length; i++)
				{
					var cmt = postService.bufferComments[i];
					for (var j = 0; j < postService.posts.data.length; j++)
					{
						var post = postService.posts.data[j];
						if (post.id == cmt.postId)
						{
							post.comments.push(cmt);
							break;
						}

					}
				}
			};

			//load posts from json
			postService.loadPosts = function ()
			{
				$http({
						method: 'GET',
						url: 'data/posts.json'
					}
				).success(
					function (response)
					{
						postService.posts.data = response;
						postService.loadBufferedComments();
					}
				).error(function (data, status, headers, config)
					{
						var err = "Load Posts Error" + status;
						userService.hamError = err;
						console.log(err);
					})
			};

			postService.loadPosts();

			/*
			* store buffered posts into local cache
			* called when posts is modified and when commented added to buffered posts
			* */
			postService.storeLocalPosts = function (posts)
			{
				$.jStorage.set('local_posts', posts)
				;
			};
			
			/*
			* store comments to json posts
			* called when comments added to json posts
			* */
			postService.storeBufferComments = function (comments)
			{
				$.jStorage.set('bufferedComments', comments);
			};

			/*
			* makes new local post
			* called from modal window controller
			* */
			postService.makeLocalPost = function (userid, content)
			{
				var nn = getNewPostNumber;
				var post = {id: nn, userId: userid, content: content, comments: []};
				postService.localPosts.data.push(post);
				postService.storeLocalPosts(postService.localPosts.data);

			};

			/*
			* parent add comment function
			* called from ticker controller
			* */
			postService.addComment = function (userid, postid, content)
			{
				for (var i = 0; i < postService.posts.data.length; i++)
				{
					var post = postService.posts.data[i];
					if (post.id == postid)
					{
						var cmt = {
							id: getNewPostNumber(),
							postId: postid,
							userId: userid,
							date: "",
							content: content
						};
						post.comments.push(cmt);
						postService.bufferComments.push(cmt);
						postService.storeBufferComments(postService.bufferComments);
						break;
					}
				}
				for (var i = 0; i < postService.localPosts.data.length; i++)
				{
					var post = postService.localPosts.data[i];
					if (post.id == postid)
					{
						post.comments.push({
							id: getNewPostNumber(),
							postId: postid,
							userId: userid,
							date: "",
							content: content
						});
						postService.storeLocalPosts(postService.localPosts.data);
						break;
					}
				}
			};

			
			/*
			* Gets new post number for post or comment.
			* Since it seems like posts and comments share an id system, I just set it to 1 + highest value
			* */
			function getNewPostNumber()
			{
				var nn = 1;
				for (var i = 0; i < postService.posts.data.length; i++)
				{
					var post = postService.posts.data[i];
					console.log(post);
					if (post.id >= nn)
					{
						nn = post.id + 1;
					}
					for (var j = 0; j < post.comments.length; j++)
					{
						var comment = post.comments[j];
						console.log(comment);
						if (comment.id >= nn)
						{
							nn = comment.id + 1;
						}
					}
				}
				for (var i = 0; i < postService.localPosts.data.length; i++)
				{
					var post = postService.localPosts.data[i];
					if (post.id >= nn)
					{
						nn = post.id + 1;
					}
					for (var j = 0; post.comments.length; j++)
					{
						var comment = post.comments[j];
						if (comment.id >= nn)
						{
							nn = comment.id + 1;
						}
					}
				}
				return nn;
			}


			return postService;
		}
	]
);
	

