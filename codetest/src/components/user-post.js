import { BaseComponent } from './base-component.js';
import { UserProfilePic } from './user-profile-pic.js';
import { ModalConfirmContent } from './modal-confirm-content.js';
import { PageModal } from './page-modal.js';
import { DataStore } from '../js/DataStore.js';
import { PostsController } from '../js/PostsController.js';
import { GetCurrentUser } from'../js/CurrentUser.js'
import { UserPostLeaveComment } from'./user-post-leave-comment.js'

export class UserPost extends BaseComponent {	

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
					margin-top: 23px;
				}
				.post h3 {
					display: block;
					position: relative;
					top: 1px;
				}
				.post-content {
					min-height: 50px;
				}

				.post .profile-pic {
					float: left;
				}

				.post .post-text {
					margin: 2px 0px 3px 0px;
					display: block;
					float: right;
					width: 450px;					
				}

				
				.comments {	
					margin: 0 0 0 55px;
					background-color: #ededed;
					padding: 1px;
					clear: both;
				}
		
				.post hr {
					border: none;
					height: 1px;
					background-color: #d8d8d8;
					margin: 6px -4px 0;
				}
				
				.comment.post {
					min-height: 50px;
					padding: 6px 6px 4px;					
					margin-top: 10px;
					clear: both;
				}

				.comment .profile-pic {
					margin: 0 10px 0 0;
				}
				.comment .post-text {
					width: 411px;
				}
				.leave-comment {
					padding: 2px;
				}
				.leave-comment input {
					width: 443px;
					display: inline-block;
					vertical-align: top;
					height: 19px;
					border: 1px solid #ddd;
					margin: 2px;
					padding: .2em;
				}	
				.leave-comment input:focus {
					width: 414px;
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
		this.CurrentUser = GetCurrentUser();		
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
			<user-post-leave-comment data-post-id="${this.post_id}"></user-post-leave-comment>
		`;
	}
	
	RenderControls(){
		if(this.user_id == this.CurrentUser.id){
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
		//delete post button (only available if logged in user matches)
		this.deletePostControl = this.shadowRoot.querySelector(".delete-post");


		
		if(this.deletePostControl != null){
			this.deletePostControl.addEventListener("click", function(e){
				e.preventDefault();
				
				var confirmModal = document.createElement("page-modal");
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
	
	OnCommentAdded(commentData){
		var userData = DataStore.GetDataById("Users", commentData.userId);
		var newComment = document.createElement("user-post");
		newComment.setAttribute("data-user-id", userData.id);
		newComment.setAttribute("data-user-name", userData.username);
		newComment.setAttribute("data-user-pic", userData.pic);
		newComment.setAttribute("data-post-id", this.post_id);
		newComment.setAttribute("data-comment-id", commentData.id);
		newComment.innerHTML = commentData.content;
		
		this.commentContainer = this.shadowRoot.querySelector(".comments-list");
		this.commentContainer.innerHTML = this.commentContainer.innerHTML + newComment.outerHTML;
	}
	
	OnDeleted(){
		var elem = this.shadowRoot.host;
		elem.parentNode.removeChild(elem);
	}
}

customElements.define('user-post', UserPost);