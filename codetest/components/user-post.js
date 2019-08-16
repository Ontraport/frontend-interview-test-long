class UserPost extends BaseComponent {	

	get html(){
		return `<div class="post ${this.isComment}">
					<div class='post-content'>
						<div class="profile-pic">
							<user-profile-pic src="${this.user_pic}" width="${this.picWidth}" />			
						</div>
						<h3 class="profile-name">
							${this.user_name}
						</h3>
						<p class="post-text">
							<slot></slot>
						</p>
						${this.delete_control}
					</div>
					<div class="comments">
						<div class="comments-list">
							${this.comments}
						</div>
						${this.leave_comment}				
					</div>
					${this.hr}
				</div>
		`;
	}
	
	get style(){
		return `
			<style>				
				.post {
					position: relative;
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
		
				.post hr {
					border: none;
					height: 1px;
					background-color: #d8d8d8;
					margin: 0 -4px;
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
					display: inline-block;
					vertical-align: top;
					height: 19px;
					border: 1px solid #ddd;
					margin: 2px;					
				}	
				.leave-comment input:focus {
					width: 418px;
					border: 1px solid #ddd;
				}
				#profilePicWrap {
					display:none;					
				}
				#profilePicWrap.active {
					display:inline-block;
					vertical-align: top;
				}
				.delete-post {
					float: right;
					color: #ddd;
					text-decoration: none;
					position: absolute;
					right: 5px;
					top: 0;		
					display: block;
				}
				.delete-post:hover { color: red; }
				
			</style>`;
	}

	ReadAttributes(){
		this.loggedInUser = DataStore.GetDataById("Users", CurrentUser().id);
		
		this.user_id = this.getAttribute("data-user-id");
		this.post_id = this.getAttribute("data-post-id");
		this.comment_id = this.getAttribute("data-comment-id");
		this.user_pic = this.getAttribute("data-user-pic");
		this.user_name = this.getAttribute("data-user-name");	
		this.isComment = "";
		this.leave_comment = "";
		this.comments = "";
		this.picWidth = "50px";
		this.delete_control = ``;
		this.hr = ``;
	}
	
	Render(){	

		this.RenderControls();
		//this is a parent post, not a comment
		if(this.comment_id == null){
			//render comments of this post
			this.RenderComments();
			this.RenderLeaveCommentForm();
		} else {
			//this is a comment of a post
			this.isComment = "comment";
			this.picWidth = "25px";
			this.hr = `<hr />`;
		}
		
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	RenderComments(){
		var postData = DataStore.GetDataById("Posts", this.post_id);
		for(var i = 0; i < postData.comments.length; i++){
			var commentData = postData.comments[i];
			var userData = DataStore.GetDataById("Users",commentData.userId);
			var newPost = document.createElement("user-post");
			newPost.setAttribute("data-user-id", userData.id);
			newPost.setAttribute("data-user-name", userData.username);
			newPost.setAttribute("data-user-pic", userData.pic);
			newPost.setAttribute("data-post-id", this.post_id);
			newPost.setAttribute("data-comment-id", commentData.id);
			newPost.innerHTML = commentData.content;
			this.comments = this.comments + newPost.outerHTML;
			this.comments = this.comments;
		}	
	}
	
	RenderLeaveCommentForm(){
		//render leave-comment form
		this.leave_comment = `
			<div class="leave-comment">
				<div id='profilePicWrap'>
					<user-profile-pic width="25px" src="${this.loggedInUser.pic}"></user-profile-pic>
				</div>
				<input id="commentInput" type="text" placeholder="post a comment" />
			</div>	
		`;
	}
	
	RenderControls(){
		if(this.user_id == CurrentUser().id){
			this.delete_control = `
			<a class="delete-post" href="javascript:void(0);">
				delete
			</a>`;
		}
	}
	
	AttachEvents(){
		var $this = this;
		//list of comments
		this.commentContainer = this.shadowRoot.querySelector(".comments-list");		
		//leave-a-comment text input
		this.commentInput = this.shadowRoot.querySelector("#commentInput");	
		//delete post button (only available if logged in user matches)
		this.deletePostControl = this.shadowRoot.querySelector(".delete-post");
		//popup profile pic when typing comment		
		this.commentInputProfilePic = this.shadowRoot.querySelector("#profilePicWrap");	
		
		
		//Attach Events to controls
		if(this.commentInput != null){
			this.commentInput.addEventListener("keyup", function(e){
				if(e.code == "Enter" || e.code == "NumpadEnter"){
					$this.SubmitComment(this.value);
					this.value = "";
				}
			});
			
			this.commentInput.addEventListener("focus", function(e){
				console.log("focus");
				$this.commentInputProfilePic.classList.add("active");
				$this.commentInput.setAttribute("placeholder", "start typing and hit enter to submit");
			});
			this.commentInput.addEventListener("focusout", function(e){
				console.log("focusout");
				$this.commentInputProfilePic.classList.remove("active");
				$this.commentInput.setAttribute("placeholder", "post a comment");
			});
		}
		
		if(this.deletePostControl != null){
			this.deletePostControl.addEventListener("click", function(e){
				e.preventDefault();
				
				var confirmModal = document.createElement("post-modal");
				confirmModal.setAttribute("data-title", "Are you sure you want to delete this?");			
				
				var postConfirmDelete = document.createElement("modal-confirm-content");
				postConfirmDelete.setAttribute("data-question", "Are you sure you want to delete this comment?");
				postConfirmDelete.setAttribute("data-content", $this.innerHTML);
				postConfirmDelete.setAttribute("data-confirm-text", "Delete");
				postConfirmDelete.setAttribute("data-cancel-text", "Cancel");
				confirmModal.appendChild(postConfirmDelete);
				
				document.body.appendChild(confirmModal);
				
				var closeModal = postConfirmDelete.querySelector(".close-modal");
				closeModal.addEventListener("click", function(e){
					confirmModal.closeModal();
					e.preventDefault();
					e.stopPropagation();
				});
				
				var confirmButton = postConfirmDelete.querySelector(".confirm");
				confirmButton.addEventListener("click", function(e){
					$this.DeletePost();
					confirmModal.closeModal();
					e.preventDefault();
					e.stopPropagation();
				});
				confirmModal.openModal();
			});
		}
		
	}

	
	DeletePost(){
		if(this.comment_id == null){	
			PostsController.DeletePost(this.post_id, this);			
		} else {
			PostsController.DeleteComment(this.post_id, this.comment_id, this);					
		}
	}
	
	SubmitComment(comment){
		PostsController.AddComment(this.post_id, comment, this);
	}
	
	OnCommentAdded(commentData){
		var userData = DataStore.GetDataById("Users", commentData.userId);
		var newComment = document.createElement("user-post");
		newComment.setAttribute("data-user-id", userData.id);
		newComment.setAttribute("data-user-name", userData.username);
		newComment.setAttribute("data-user-pic", userData.pic);
		newComment.setAttribute("data-post-id", this.post_id);
		newComment.setAttribute("data-comment-id", commentData.id);
		newComment.innerHTML = commentData.content;
		
		this.commentContainer.innerHTML = this.commentContainer.innerHTML + newComment.outerHTML;
	}
	
	OnDeleted(){
		var elem = this.shadowRoot.host;
		elem.parentNode.removeChild(elem);
	}
}

customElements.define('user-post', UserPost);