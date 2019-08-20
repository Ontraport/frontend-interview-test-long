
import { BaseComponent } from './base-component.js';
import { PostsController } from '../js/PostsController.js';
import { DataStore } from '../js/DataStore.js';
import { UserAccountPanel } from './user-account-panel.js';
import { UserPost } from './user-post.js';

export class PostsPage extends BaseComponent {	

	get html(){
		return 	`
			<div id='wrapper'>				
				<user-account-panel data-user-id="${this.user_id}"  data-user-pic="${this.user_pic}"  data-user-name="${this.user_name}"></user-account-panel>				
				<div id="postPanel" class="panel">				
					<div class="panel-content">					
						<h1>Updates</h1>
						<div id='sortByWrapper'>
							sort by 
							<select id='sortBy'>
								<option value='old'>old</option>
								<option value='new'>new</option>
							</select>
						</div>
						<div class="post-list">
							${this.posts}
						</div>
					</div>
				</div>
			</div>
		`;	
	}
	
	get style(){
		return `
			<style>				
				#wrapper {
					display: flex;
					justify-content: space-between;
					align-items:flex-start;
					align-content:flex-start;
				}
				#postPanel {	
					width: 525px;
					min-height: 200px;
				}	

				#wrapper h1 {
					margin-bottom: 28px;
					float: left;
				}
				
				#sortByWrapper {
					float: right;
				}
				
				.post-list {
					clear: both;
				}

			</style>`;
	}
	ReadAttributes(){
		PostsController.PostsPage = this;
		this.user_id = this.getAttribute("data-user-id");
		this.user_pic = this.getAttribute("data-user-pic");
		this.user_name = this.getAttribute("data-user-name");		
		this.sortBy = null;
	}
	
	Render(){
		this.RenderPosts();
		this.shadowRoot.innerHTML = this.style + this.html;		
		
	}
	
	AttachEvents(){		
		var $this = this;
		this.sortBy = this.shadowRoot.querySelector("#sortBy");
		this.sortBy.addEventListener("change", function(e){			
			$this.RenderPosts();
			$this.postContainer.innerHTML = $this.posts;
			$this.SetPostArray();
		});
		
		this.postContainer = this.shadowRoot.querySelector("#postPanel .post-list");
		this.SetPostArray();
	}
	
	//store posts for later access
	SetPostArray(){
		let renderedPosts = this.postContainer.querySelectorAll("user-post");
		for(let post of renderedPosts){
			this.postArray[post.post_id] = post;
		}
	}
	
	RenderPosts(){
		this.postArray = [];
		this.posts = "";	
		var PostData = DataStore.GetTableData("Posts");
		if(PostData != null){
			for(var i = 0; i < PostData.length; i++){
				var postData = PostData[i];
				if(postData != null){
					var userData = DataStore.GetDataById("Users", postData.userId);
					var newPost = document.createElement("user-post");
					newPost.setAttribute("data-user-id", postData.userId);
					newPost.setAttribute("data-post-id", postData.id);
					newPost.setAttribute("data-user-name", userData.username);
					newPost.setAttribute("data-user-pic", userData.pic);
					newPost.innerHTML = postData.content;	
						
					if(this.sortBy == null || this.sortBy.value == 'old'){
						this.posts = this.posts + newPost.outerHTML;
					} else if(this.sortBy.value == 'new'){
						this.posts = newPost.outerHTML + this.posts;
					}
				}
			}	
		}			
	}

	AddPost(postData) {		
		var userData = DataStore.GetDataById("Users", postData.userId);
		var newPost = document.createElement("user-post");
		newPost.setAttribute("data-user-id", postData.userId);
		newPost.setAttribute("data-post-id", postData.id);
		newPost.setAttribute("data-user-name", userData.username);
		newPost.setAttribute("data-user-pic", userData.pic);
		newPost.innerHTML = postData.content;
		if(this.sortBy == null || this.sortBy.value == 'old'){
			this.postContainer.appendChild(newPost);
		} else if(this.sortBy.value == 'new'){
			this.postContainer.insertBefore(newPost,this.postContainer.firstChild);
		}
		this.SetPostArray();
	}
	
	OnCommentAdded(commentData){
		if(this.postArray[commentData.postId]){
			this.postArray[commentData.postId].OnCommentAdded(commentData);
		}
	}
}

customElements.define('posts-page', PostsPage);