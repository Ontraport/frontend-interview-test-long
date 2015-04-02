/**
 * Created by Hamster on 3/22/2015.
 */

var ontraServices = angular.module('OntraAppServices', []);

ontraServices.factory('UserService', ['$http',
		function ($http)
		{
			var userService = {users: []};

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
				)
			};

			userService.loadUsers();


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
			var postService = {posts: {data: []}, localPosts: {data: []}, bufferedComments:[]};
			var localStored = $.jStorage.get('local_posts', []);
			postService.localPosts.data = localStored.data;
			var commentStored = $.jStorage.get('bufferedComments', []);
			postService.bufferComments = commentStored;
			
			postService.loadBufferedComments = function()
			{
				var commentStored = $.jStorage.get('bufferedComments', []);
				postService.bufferComments = commentStored;
				for (var i = 0; i < postService.bufferComments.length; i++)
				{
					var cmt = postService.bufferComments[i];
					console.log(cmt);
					for (var j = 0; j < postService.posts.data.length; j++)
					{
						var post = postService.posts.data[j];
						console.log(post, cmt.postId);
						if (post.id == cmt.postId)
						{
							console.log("found");
							post.comments.push(cmt);
							break;
						}

					}
				}
			};
			
			
			
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
				)
			};

			postService.loadPosts();


			postService.storeLocalPosts = function (posts)
			{
				/*if (Box.supported())
				 {
				 Box.store("local_posts", posts);
				 }*/
				$.jStorage.set('local_posts', posts)
				;
			};
			
			postService.storeBufferComments = function(comments)
			{
				$.jStorage.set('bufferedComments', comments);
			}

			postService.makeLocalPost = function (userid, content)
			{
				var nn = getNewPostNumber;
				var post = {id: nn, userId: userid, content: content, comments: []};
				postService.localPosts.data.push(post);
				postService.storeLocalPosts(postService.localPosts);

			};

			postService.addComment = function (userid, postid, content)
			{
				console.log(postid);
				for (var i = 0; i < postService.posts.data.length; i++)
				{
					var post = postService.posts.data[i];
					if (post.id == postid)
					{
						console.log('found');
						console.log(post);
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
						break;
					}
				}
			};

			function getNewPostNumber()
			{
				var nn = 1;
				for (var i = 0; i < postService.posts.length; i++)
				{
					var post = postService.posts[i];
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
				for (var i = 0; i < postService.localPosts.length; i++)
				{
					var post = postService.localPosts[i];
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
	

