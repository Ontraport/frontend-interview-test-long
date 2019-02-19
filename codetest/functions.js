	let numberOfPosts = 0;
  	let user = '';
	let avatar = '';	
	
	function renderPage() {
		var arr = new Array();
		// https://api.myjson.com/bins/ih96w
		$.getJSON("data/users.json", function(data){
			$.each(data, function(i, post){		 
				var temp = new Array(post.id, post.username, post.pic);
				arr.push(temp);
			});
		});

		if(arr != null) {			
			createPosts(arr);
		
			return arr;
		}
		return null;
	}	
	
	function textareaFocus(element) {
		element.parentElement.classList.add("focused");  
	}
	
	function textareaUfocus(element) {
		element.parentElement.classList.remove("focused");  
	}
	
	function overlayOn() {
		document.getElementById("overlay").style.display = "block";
	}
	
	function overlayOff() {
		document.getElementById("overlay").style.display = "none";
	}
	
	function login(arr) {
		//login with user id 5
  		user = arr[4][1];
		avatar = arr[4][2];		
		
		document.getElementById("user-name").innerHTML = '_' + user;
		document.getElementById("user-image").innerHTML = '<img src="' + avatar + '" />';
		document.getElementById("profile-img").innerHTML = '<img class="profile-img" src="' + avatar + '" />';
		
		var testimonials = document.querySelectorAll('.reply-avatar');
		Array.prototype.forEach.call(testimonials, function(elements, i) {
			elements.innerHTML = '<img src="' + avatar + '" />';
		});
	}
  
	function createPosts(arr) {	
		// https://api.myjson.com/bins/1e5auw
		$.getJSON("data/posts.json", function(data){
			$.each(data, function(i, post){			
				let comment = '<div id="comment-section-' + post.id + '">';	
				$.each(post.comments, function(j, comments){	
					comment +=	'<div class="comment">'+
									'<div class="comment-image">'+
										'<img src="' + arr[comments.userId-1][2] + '" />'+
									'</div>'+		
									'<div class="comment-contents">'+
										'<div class="comment-name">' + arr[comments.userId-1][1] + '</div>'+
										'<div class="comment-message">' + comments.content+ '</div>'+
									'</div>'+
								'</div><hr>';
				});
				comment += 	'</div>'+
							'<div class="reply-field">'+
								'<div class="reply-avatar"></div>'+
								'<textarea id="textarea-' + (i+1) + '" class="add-comment" placeholder="post a comment" onkeypress="userReply(' + (i+1) + ');" onfocus="textareaFocus(this);" onfocusout="textareaUfocus(this);"></textarea>'+
							'</div>';	
				document.getElementById("content").innerHTML +=	'<div class="post-container">'+
							'<div class="post">'+
								'<div class="post-image">'+
									'<img src="' + arr[post.userId-1][2] + '" />'+
								'</div>'+
								'<div class="post-contents">'+
									'<div class="post-name">' + arr[post.userId-1][1]+ '</div>'+
									'<div class="post-message">' +  post.content + '</div>'+
								'</div>'+
							'</div>'+
							'<div id="comments-' + post.id +'" class="comments">'+ comment +
						'</div>'+
					'</div>';					
				numberOfPosts = i+2;
			});
			login(arr);	
		});  	
	}

	function userReply(i) {
		var key = window.event.keyCode;
		// Enter key is 13
		if (key === 13) {
			var reply = document.getElementById("textarea-"+i).value;		
			document.getElementById("comment-section-" + i).innerHTML += '<div class="comment">'+
				'<div class="comment-image">'+
					'<img src="' + avatar + '" />'+
				'</div>'+		
				'<div class="comment-contents">'+
					'<div class="comment-name">' + user + '</div>'+
						'<div class="comment-message">' + reply + '</div>'+
					'</div>'+
				'</div><hr>';
			document.getElementById("textarea-"+i).value="";
		}
	}

	function newPost() {
		var key = window.event.keyCode;
		// Enter key is 13
		if (key === 13) {
			var newpost = document.getElementById("new-post").value;
			document.getElementById("content").innerHTML +=	'<div class="post-container">'+
				'<div class="post">'+
					'<div class="post-image">'+
						'<img src="' + avatar + '" />'+
					'</div>'+
					'<div class="post-contents">'+
						'<div class="post-name">' + user + '</div>'+
						'<div class="post-message">' +   newpost + '</div>'+
					'</div>'+
				'</div>'+
				'<div id="comments-' + numberOfPosts + '" class="comments"><div id="comment-section-' + numberOfPosts + '">'+
				'</div>'+
				'<div class="reply-field">'+
					'<div class="reply-avatar">'+
						'<img src="' + avatar + '" />'+
					'</div>'+
					'<textarea id="textarea-' + numberOfPosts + '" class="add-comment" placeholder="post a comment" onkeypress="userReply(' + numberOfPosts + ');" onfocus="textareaFocus(this);" onfocusout="textareaUfocus(this);"></textarea>'+
				'</div>'+
			'</div>';
			document.getElementById("new-post").value="";
			numberOfPosts++;
			overlayOff();
		}
	}




	function modalPost(file, object) {
		let regex = /({{)+(\w)+(}})/g;
		let html;
		
		fetch(file).then(function(response) {
			html = response.text();

			let regexOutput = html.match(regex);
			for(i = 0; i < regexOutput.length;i++) {
				let key = regexOutput[i].replace("{{","").replace("}}","");
				html = html.replace("{{" + key + "}}", object[key]);
			}
			
			return html;
			})
		.catch(function(err) {  
			console.log('Failed to fetch page: ', err);  
		});

		return html;
		/*let regs = modal.match(regex);
		for(i = 0; i < regs.length;i++) {
			let key = regs[i].replace("{{","").replace("}}","");
			let str ="{{" + key + "}}";
			modal = modal.replace(str, object[key]);
		}
		return modal;*/
	}
