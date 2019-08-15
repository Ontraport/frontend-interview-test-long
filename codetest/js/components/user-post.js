class UserPost extends HTMLElement {	

	constructor(){
		super();
		this.attachShadow({mode: "open"});
		this._$div = null;
	}

	connectedCallback(){
		console.log("connected");
		const user_id = this.getAttribute("data-user-id");
		const post_id = this.getAttribute("data-post-id");
		const user_pic = this.getAttribute("data-user-pic");
		const user_name = this.getAttribute("data-user-name");
		
		var isComment = "";
		var leave_comment = "";
		var comments = "";
		var picWidth = "50px";
		if(post_id != null){
			var postData = Data.Posts[post_id];
			for(var i = 0; i < postData.comments.length; i++){
				var commentData = postData.comments[i];
				var userData = Data.Users[commentData.userId];
				var newPost = document.createElement("user-post");
				newPost.setAttribute("data-user-id", userData.id);
				newPost.setAttribute("data-user-name", userData.username);
				newPost.setAttribute("data-user-pic", userData.pic);
				newPost.innerHTML = commentData.content;
				comments = comments + newPost.outerHTML;
				comments = comments + "<hr />";
			}	
			leave_comment = `
				<div class='leave-comment'>
					<input type='text' placeholder="post a comment" />
				</div>	
			`;
		} else {
			isComment = "comment";
			picWidth = "25px";
		}
		
		this.shadowRoot.innerHTML = `
			<style>		
				h2, h3 {
					display: inline-block;
					padding: 0;
					margin: 0;
				}

				h2 {
					font-size: 1em;
					font-weight: normal;
				}

				h3 {
					font-weight: bold;
					color: #0279c9;
					font-size: 1em;
				}			
				.post {
					margin-top: 20px;
				}
				.post-content {
					min-height: 50px;
				}

				.post .profile-pic {
					float: left;
				}

				.post .post-text {
					margin: 0 0 0 35px;
				}

				
				.comments {	
					margin: 0 0 0 55px;
					background-color: #ededed;
					padding: 1px;
				}
		
				.comments hr {
					border: none;
					height: 1px;
					background-color: #d8d8d8;
					margin: 0 2px;
				}
				
				.comment.post {
					min-height: 50px;
					padding: 6px;					
					margin-top: 10px;
				}

				.comment .profile-pic {
					margin: 0 10px 0 0;
				}

			
				.leave-comment {
					padding: 2px;
				}
				.leave-comment input {
					width: 448px;
					margin: 2px;
					display: block;
				}				
				.profile-pic {
					margin: 0 15px 0 0;
					display: inline-block;
				}
			</style>
			<div class="post ${isComment}">
				<div class='post-content'>
					<div class="profile-pic">
						<user-profile-pic src="${user_pic}" width="${picWidth}" />			
					</div>
					<h3 class="profile-name">
						${user_name}
					</h3>
					<p class="post-text">
						<slot></slot>
					</p>
				</div>
				<div class="comments">
					${comments}
					${leave_comment}				
				</div>
			</div>
		`;
		this._$div = this.shadowRoot.querySelector(".post");		
	}	
}

customElements.define('user-post', UserPost);