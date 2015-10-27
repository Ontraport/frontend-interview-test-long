window.onload = function(){
	//assumptions
	var my_id=5;
	//set variables
	var userURL = "http://raw.githubusercontent.com/Ontraport/frontend-interview-test-long/master/codetest/data/users.json",
		postURL = "http://raw.githubusercontent.com/Ontraport/frontend-interview-test-long/master/codetest/data/posts.json",
		posts_column = document.getElementById('posts'),
		modal_form = document.getElementById('modal_form'),
		hide_modal = document.getElementById('hide_modal'),
		modal_input = document.getElementById('modal_input'),
		modal_link = document.getElementById('modal_link'),
		post_id=7,
		user_id=5,
		users, posts, my_profile;
	//show the modal from nav link
	modal_link.onclick = function(e){
		if (e.preventDefault) e.preventDefault();
		hide_modal.setAttribute("class", 'visible');
		return false
	};
	//add post to end of the line from modal form
	function addPostFromForm(e){
		if (e.preventDefault) e.preventDefault();
		var post = {};
		post.id = post_id++;
		post.userId= my_id;
		post.content= modal_input.value;
		post.comments =[];
		appendPost(post);
		posts.push(post);
		Box.store('posts', posts);
		modal_input.value='';
		hide_modal.setAttribute("class", 'hidden');
		return false;
	}
	if (modal_form.attachEvent) {
		modal_form.attachEvent("submit", addPostFromForm);
	} else {
		modal_form.addEventListener("submit", addPostFromForm);
	}

	//asynchronously get JSON from data files
	function getJSON(url, callback){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onload = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var myArr = JSON.parse(xmlhttp.responseText);
				callback(myArr);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	
	};

	//load users from data or box
	function loadUsers(){
		if(Box.isset('users')){
			initiate(Box.fetch('users'));
		} else {
			getJSON(userURL, function(users){Box.store('users', users); initiate(users)});
		}
	};
	//load posts from data or box
	function loadPosts(){
		if(Box.isset('posts')){
			populatePosts(Box.fetch('posts'));
		} else {
			getJSON(postURL, function(posts){Box.store('posts', posts); populatePosts(posts)});
		}
	};
	//login to site at user(id=5)
	function login(id){
		users.forEach(function(user){
			if (user.id===id){
				my_profile=user
			}
		});
		document.getElementById('name').innerHTML = my_profile.username
		document.getElementById("prof-pic").src = document.getElementById("nav-pic").src = my_profile.pic
		console.log(my_profile.username);
	};
	//add posts to end of column
	function appendPost(post){
		var user= users[post.userId-1],
			post_div = document.createElement('div'),
			post_img = document.createElement('img'),
			post_name = document.createElement('h5'),
			post_content = document.createElement('p'),
			comment_column = document.createElement('div'),
			comment_group = document.createElement('div'),
			comment_form = document.createElement('form'),
			hidden_input = document.createElement('input'),
			input = document.createElement('input'),
			submit_input = document.createElement('input');
		post_div.setAttribute("id", post.id);
		post_content.innerHTML = post.content;
		post_name.innerHTML = user.username;
		post_img.src = user.pic;
		comment_group.setAttribute("class", 'comments');
		comment_column.setAttribute("class", 'comment_col');
		comment_column.appendChild(comment_group);
		comment_column.appendChild(comment_form);
		hidden_input.setAttribute("class", 'hidden');
		submit_input.setAttribute("class", 'hidden');
		submit_input.setAttribute("type", 'submit');
		hidden_input.value = post.id;
		input.setAttribute("placeholder", 'post a comment');
		comment_form.appendChild(hidden_input);
		comment_form.appendChild(input);
		comment_form.appendChild(submit_input);
		post_div.appendChild(post_img);
		post_div.appendChild(post_name);
		post_div.appendChild(post_content);
		post_div.appendChild(comment_column);
		posts_column.appendChild(post_div);
		if(post.comments.length){
			post.comments.forEach(function(comment){appendComment(post.id, user, comment)});
		}
		addCommentListener(comment_form);
	};
	//add comments to specefic post
	function appendComment(post_id, user, comment){
		var comment_group = document.getElementById(post_id).getElementsByClassName('comments')[0],
			comment_div = document.createElement('div');
		comment_div.setAttribute("id", comment.id);
		comment_div.innerHTML = "<img src='" + user.pic +"'/> <h5> " +
			user.username + " </h5> <p> " + comment.content + " </p> <hr/>"
		comment_group.appendChild(comment_div);
	}
	//create form listener with each comment
	function addCommentListener(form){
		function addCommentFromForm(e){
			var comment = {},
				post_id = form.childNodes[0].value,
				comment_content = form.childNodes[1].value || '"empty"';
			comment.id = '';
			comment.postId= post_id;
			comment.userId= my_id;
			comment.content= comment_content;
			if (e.preventDefault) e.preventDefault();
			appendComment(post_id, my_profile, comment)
			var index = post_id-1;
			posts[index].comments.push(comment);
			Box.store('posts', posts);
			form.childNodes[1].value='';
			return false;
		}
		if (form.attachEvent) {
			form.attachEvent("submit", addCommentFromForm);
		} else {
			form.addEventListener("submit", addCommentFromForm);
		}
	}
	//add loaded posts to column
	function populatePosts(posts_payload){
		posts_column.innerHTML = '';
		posts= posts_payload;
		posts.forEach(function(post){appendPost(post)});
	};
	//blueprint for whole site
	function initiate(payload){
		users = payload;
		login(my_id);
		loadPosts();
	}
	loadUsers();
	//debug tools
	document.getElementById('reload').onclick = function(e){
		if (e.preventDefault) e.preventDefault();
		Box.empty();
		loadUsers();
		return false;
	};
};
