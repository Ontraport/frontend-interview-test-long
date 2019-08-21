import { BaseComponent } from './base-component.js';
import { UserProfilePic } from './user-profile-pic.js';
import { postsController } from '../js/PostsController.js';
import { GetCurrentUser } from'../js/CurrentUser.js'

export class UserPostLeaveComment extends BaseComponent {	

	get html(){
		return `
			<div id="wrapper">
				<div id='profilePicWrap'>
					<user-profile-pic width="25px" src="${this.CurrentUser.pic}"></user-profile-pic>
				</div>
				<input id="commentInput" type="text" placeholder="post a comment" />
			</div>
		`;
	}
	
	get style(){
		return `
			<style>					
				#wrapper {
					padding: 2px;
				}
				#wrapper input {
					width: 453px;
					display: inline-block;
					vertical-align: top;
					border: 1px solid #ddd;
					margin: 0px;
					padding: 3px 2px;
					border-radius: 3px;
				}	
				#wrapper input:focus {
					width: 425px;
				}
				#wrapper input.valid {
					outline-color: green;
				}
				#wrapper input.invalid {
					outline-color: red;
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
		this.post_id = this.getAttribute("data-post-id");
		this.minLength = 1;
		this.maxLength = 256;
	}
	
	Render(){	
	
		this.shadowRoot.innerHTML = this.style + this.html;
	}

	

	
	AttachEvents(){
		var $this = this;
		//leave-a-comment text input
		this.wrapper = this.shadowRoot.querySelector("#wrapper");	
		this.commentInput = this.shadowRoot.querySelector("#commentInput");	
		//popup profile pic when typing comment		
		this.commentInputProfilePic = this.shadowRoot.querySelector("#profilePicWrap");	
		
		
		//Attach Events to controls
		if(this.commentInput != null){
			this.commentInput.addEventListener("keyup", function(e){
				if($this.Validate(this)){
					if(e.code == "Enter" || e.code == "NumpadEnter"){
						$this.SubmitComment(this.value);
						this.value = "";
					}
				}
			});
			
			this.commentInput.addEventListener("focus", function(e){
				$this.commentInputProfilePic.classList.add("active");
				$this.commentInput.setAttribute("placeholder", "start typing and hit enter to submit");
			});
			this.commentInput.addEventListener("focusout", function(e){
				$this.commentInputProfilePic.classList.remove("active");
				$this.commentInput.setAttribute("placeholder", "post a comment");
			});
		}
		
		
		
	}
	
	Validate(input){
		let result = false;		 
		if(input.value.length < this.minLength){
			input.classList.remove("valid");
			input.classList.add("invalid");
		} else if(input.value.length > this.maxLength){
			input.classList.remove("valid");	
			input.classList.add("invalid");
			input.value = input.value.substr(0, this.maxLength);
		} else {	
			result = true;
			input.classList.add("valid");
			input.classList.remove("invalid");	
		}
		if(input.value.length == 0){			
			input.classList.remove("valid");	
			input.classList.remove("invalid");	
		}
		return result;
	}
	
	SubmitComment(comment){
		postsController.AddComment(this.CurrentUser.id, this.post_id, comment);
	}

	
}

customElements.define('user-post-leave-comment', UserPostLeaveComment);