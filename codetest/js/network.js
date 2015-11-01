// JavaScript Document
if (!window.jQuery) {
  	var script = document.createElement('script');
	script.type = 'text/javascript';
  	if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                network_init();
            }
        };
    } else {  //Others
        script.onload = function(){
            network_init();
        };
    }
  	script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js';
  	document.getElementsByTagName('head')[0].appendChild(script);
}
function network_init(){
	//Modal Library
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'js/jquery.modal.min.js';
  	document.getElementsByTagName('head')[0].appendChild(script);
	jQuery(document).ready(function(){
		jQuery("#search input[name=terms]").focus(function(){
			jQuery(this).addClass('focus');
		}).blur(function(){
			jQuery(this).removeClass('focus');
		});
	    if (!store.enabled) {
            alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
            return
        }
		
		var jsonFiles ={
			Load: function(file, callback){
				jQuery.ajax({
					type:    "GET",
					url:     file,
					success: function(output) {
						callback(output);
					}
				});
			},
		}
		var Users = {
			getUser: function(id){
				$users=Users.getUsers();
				if($users){
					$user=jQuery.grep($users, function(user){ return user.id == id; });
					if($user.length!=0){
						return $user[0];
					}
				}
				return false;
			},
			getUserByField: function(field, value){
				$users=Users.getUsers();
				if($users){
					$user=jQuery.grep($users, function(user){ return user[field] == value; });
					if($user.length!=0){
						return $user;
					}
				}
				return false;
			},
			getUsers: function(){
				if(store.has('users'))
					return store.get('users');
				else
					return false;
			},
			loadUsers: function(users){
				$users=Users.getUsers();
				if(!$users){
					store.set('users', users);                                                  
				}
			}
		};
		var Posts = {
			getPost: function(id){
				$posts=Posts.getPosts();
				if($posts){
					$post=jQuery.grep($posts, function(post){ return post.id == id; });
					if($post.length!=0){
						return $post[0];
					}
				}
				return false;
			},
			getPostByField: function(field, value){
				$posts=Posts.getPosts();
				if($posts){
					$post=jQuery.grep($posts, function(post){ return post[field] == value; });
					if($post.length!=0){
						return $post;
					}
				}
				return false;
			},
			addPost: function($post_content, $user_id){
				$max_id=0;
				$posts=Posts.getPosts();
				if($posts){
					jQuery.each($posts, function($index, $post){
						if($post.id>$max_id)
							$max_id=$post.id;
					});
				}
				$max_id+=1;
				$post=[
					{
						"id": $max_id,
						"userId": $user_id,
						"date": "",
						"content":$post_content,
						"comments": []					
					}
				];
				if($posts)
					posts=jQuery.merge($posts, $post);
				else
					posts=$post;
				store.set('posts', posts);
				return $post[0];
			},
			addComment: function($post_id, $comment, $user_id){
				var $posts_html=jQuery("#post-updates .posts");
				$posts=Posts.getPosts();
				$comment_added=false;
				if($posts){
					var $new_posts=new Array();
					jQuery.each($posts, function($index, $post){
						if($post.id==$post_id){
							$max_id=0;
							if($post.comments.length>0){
								jQuery.each($post.comments, function($ind, $comment){
									if($comment.id>$max_id)
										$max_id=$comment.id;
								});
							}
							$max_id+=1;
							$comment={
								"id": $max_id,
								"postId": $post_id,
								"userId": $user_id,
								"date": "",
								"content": $comment
							};
							$post.comments.push($comment);
							$comment_added=true;
						}
						$new_posts.push($post);
					});
				}
				if($comment_added){
					store.set("posts", $new_posts);
					return $comment;
				}
				return false;
			},
			getPosts: function(){
				if(store.has('posts'))
					return store.get('posts');
				else
					return false;
			},
			buildPostHtml : function($post){
				
				//Post HTML
				var $post_html=jQuery('<div></div>');
				$post_html.attr("class", 'post');
				
				//User Content
				$user=Users.getUser($post.userId);
				var $user_anchor=jQuery('<a></a>');
				$user_anchor.attr("class", 'user-image');
				var $user_img=jQuery('<img />');
				$user_img.attr("src", $user.pic);
				$user_img.attr("title", $user.username);
				$user_img.attr("alt", $user.username);
				$user_img.appendTo($user_anchor);
				$user_anchor.appendTo($post_html);
				
				//Post Content
				var $post_content=jQuery('<div></div>');
				$post_content.attr("class", 'post-content');
				var $post_content_header=jQuery('<div></div>');
				$post_content_header.attr("class", 'post-header');
				$post_content_header.html($user.username);
				$post_content_header.appendTo($post_content);
				var $post_content_main=jQuery('<div></div>');
				$post_content_main.attr("class", 'post-content-main');
				$post_content_main.html($post.content);
				$post_content_main.appendTo($post_content);
				//Comments Content
				var $post_comments=jQuery('<div></div>');
				$post_comments.attr("class", 'comments');
				if($post.comments.length>0){
					var $comments_list=jQuery('<ol></ol>');
					jQuery.each($post.comments, function($index, $comment){
						$comment_html=Posts.buildCommentHtml($comment);
						$comment_html.appendTo($comments_list);
					});
					$comments_list.appendTo($post_comments);
				}
				//Comments Form
				var $post_comments_form_div=jQuery('<div></div>');
				$post_comments_form_div.attr("class", 'comment-form');
				var $post_comments_form=jQuery('<form></form>');
				$post_comments_form.attr("id", "comment-form-"+$post.id);
				var $post_comments_form_post_id=jQuery('<input />');
				$post_comments_form_post_id.attr("type", "hidden");
				$post_comments_form_post_id.attr("name", "post_id");
				$post_comments_form_post_id.attr("value", $post.id);
				$post_comments_form_post_id.appendTo($post_comments_form);
				var $post_comments_form_comment=jQuery('<textarea></textarea>');
				$post_comments_form_comment.attr("id", "comments-"+$post.id);
				$post_comments_form_comment.attr("placeholder", "post a comment");
				$post_comments_form_comment.attr("name", "comment");
				$post_comments_form_comment.appendTo($post_comments_form);
				$post_comments_form.appendTo($post_comments_form_div);
				$post_comments_form_div.appendTo($post_comments);
				$post_comments.appendTo($post_content);
				$post_content.appendTo($post_html);
				jQuery('<div class="clr"></div>').appendTo($post_html);
				
				return $post_html;
			},
			buildCommentHtml : function($comment){
				var $comment_html=jQuery('<li></li>');
				$comment_html.attr("class", 'comment');
				
				//User Content
				$user=Users.getUser($comment.userId);
				var $user_anchor=jQuery('<a></a>');
				$user_anchor.attr("class", 'user-image');
				var $user_img=jQuery('<img />');
				$user_img.attr("src", $user.pic);
				$user_img.attr("title", $user.username);
				$user_img.attr("alt", $user.username);
				$user_img.appendTo($user_anchor);
				$user_anchor.appendTo($comment_html);
				
				//Post Content
				var $comment_content=jQuery('<div></div>');
				$comment_content.attr("class", 'post-content');
				var $comment_content_header=jQuery('<div></div>');
				$comment_content_header.attr("class", 'post-header');
				$comment_content_header.html($user.username);
				$comment_content_header.appendTo($comment_content);
				var $comment_content_main=jQuery('<div></div>');
				$comment_content_main.attr("class", 'post-content-main');
				$comment_content_main.html($comment.content);
				$comment_content_main.appendTo($comment_content);
				$comment_content.appendTo($comment_html);
				jQuery('<div class="clr"></div>').appendTo($comment_html);
				return $comment_html;
			},
			loadPosts: function(posts){
				$posts=Posts.getPosts();
				if(!$posts){
					store.set('posts', posts);
				}
			}
		};
		var app = {
			init: function(){
				this.loadUsers();
			},
			loadUsers: function(){
				jsonFiles.Load("data/users.json", app.loadPosts);
			},
			loadPosts : function(previousStepOutput){
				Users.loadUsers(previousStepOutput);
				jsonFiles.Load("data/posts.json", app.setupApp);
			},
			setupApp : function(previousStepOutput){
				Posts.loadPosts(previousStepOutput);
				
				//Setup Current User Data
				$current_user=Users.getUser(5);
				var $profile_img=jQuery('<img />');
				$profile_img.attr("id", 'avatar-'+$current_user.id)
				$profile_img.attr("src", $current_user.pic)
				$profile_img.attr("alt", $current_user.username)
				$profile_img.attr("title", $current_user.username)
				jQuery('#profile-box').prepend('<a class="user-image"></a><span class="username">'+$current_user.username+'</span><div class="clr"></div>');
				$profile_img.appendTo(jQuery('#profile-img, #profile-box .user-image'));
				
				//Setup Current Posts
				var $posts_html=jQuery("#post-updates .posts");
				$posts=Posts.getPosts();
				if($posts){
					jQuery.each($posts, function($index, $post){
						$post_html=Posts.buildPostHtml($post);
						$post_html.appendTo($posts_html);
					});
				}
				app.formAction();
			},
			formAction: function(){
				jQuery("#post-form").submit(function(e){
					e.preventDefault();
					$post_content=jQuery(this).find("#post").val();
					if($post_content=="")
						alert("Please Enter Some text to post.");
					else{
						$post=Posts.addPost($post_content, $current_user.id);
						$posts_html=jQuery("#post-updates .posts");
						$post_html=Posts.buildHtml($post);
						$post_html.appendTo($posts_html);
						jQuery.modal.close();
					}
				});
				jQuery(".comment-form form").submit(function(e){
					e.preventDefault();
					$comment_content=jQuery(this).find("textarea").val();
					$post_id=jQuery(this).find("input[name=post_id]").val();
					if($comment_content=="")
						alert("Please Enter Some text to comment.");
					else{
						$comment=Posts.addComment($post_id, $comment_content, $current_user.id);
						if($comment){
							$comment_html=Posts.buildCommentHtml($comment);
							$comments_html=jQuery(this).parents('.comments').find('ol');
							if($comments_html.length==0){
								$comments_html=jQuery('<ol></ol>');
								$comments_html.prependTo(jQuery(this).parents('.comments'));
							}
							$comment_html.appendTo($comments_html);
							document.getElementById(jQuery(this).attr('id')).reset();
						}
						else{
							alert("Error in adding comments. Try again later.");
						}
					}
				});
				jQuery('#post-form #post, .comment-form textarea').keydown(function(event){
					if(event.keyCode == 13){
						jQuery(this.form).submit()
						return false;
					 }
				});
			}
		}
		app.init();
	});
}
function merge_array(arr1, arr2){
	var i,p,obj={},result=[];
	jQuery.each(arr1, function(index, item){
		
	});
	for(i=0;i<arr1.length;i++)obj[arr1[i].name]=arr1[i].value;
	for(i=0;i<arr2.length;i++)obj[arr2[i].name]=arr2[i].value;
	for(p in obj)if(obj.hasOwnProperty(p))result.push({name:p,value:obj[p]});
	return result;
}