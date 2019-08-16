class PostsPage extends BaseComponent {	

	get html(){
		return 	`
			<div id='wrapper'>				
				<user-account-panel data-user-id="${this.user_id}"  data-user-pic="${this.user_pic}"  data-user-name="${this.user_name}"></user-account-panel>				
				<div id="postPanel" class="panel">				
					<div class="panel-content">					
						<h1>Updates</h1>
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

			</style>`;
	}
	ReadAttributes(){
		PostsController.PostsPage = this;
		this.user_id = this.getAttribute("data-user-id");
		this.user_pic = this.getAttribute("data-user-pic");
		this.user_name = this.getAttribute("data-user-name");		
	}
	
	Render(){
		this.RenderPosts();
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){		
		this.postContainer = this.shadowRoot.querySelector("#postPanel .post-list");
		
	}
	
	RenderPosts(){
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
					this.posts = newPost.outerHTML + this.posts;
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
		
		this.postContainer.innerHTML = newPost.outerHTML + this.postContainer.innerHTML;
	}
	
	
}

customElements.define('posts-page', PostsPage);