class PostsPage extends HTMLElement {	

	constructor(){
		super();
		this.attachShadow({mode: "open"});
		this._$content = null;
	}

	connectedCallback(){
		console.log("connected");
		const user_id = this.getAttribute("data-user-id");
		const user_pic = this.getAttribute("data-user-pic");
		const user_name = this.getAttribute("data-user-name");
		
		var posts = "";
		for(var i = 1; i < Data.Posts.length - 1; i++){
			var postData = Data.Posts[i];
			var userData = Data.Users[postData.userId];
			var newPost = document.createElement("user-post");
			newPost.setAttribute("data-user-id", postData.userId);
			newPost.setAttribute("data-post-id", postData.id);
			newPost.setAttribute("data-user-name", userData.username);
			newPost.setAttribute("data-user-pic", userData.pic);
			newPost.innerHTML = postData.content;
			posts = posts + newPost.outerHTML;
		}	
		
		this.shadowRoot.innerHTML = `
			<style>				
				#wrapper {
					display: flex;
					justify-content: space-between;
					align-items:flex-start;
					align-content:flex-start;
				}
				h1 {
					margin-top: 7px;
					margin-bottom: 28px;
					font-size: 1.2em
				}
				#postPanel {	
					width: 525px;
					min-height: 200px;
				}

				.panel {
					background-color: #f7f7f7;
					border-radius: 5px;
					display: block;
				}

				.panel-content {
					padding: 5px;
				}

			</style>
			<div id='wrapper'>				
				<user-account-panel data-user-id="${user_id}"  data-user-pic="${user_pic}"  data-user-name="${user_name}"></user-account-panel>				
				<div id="postPanel" class="panel">				
					<div class="panel-content">					
						<h1>Updates</h1>
						${posts}
					</div>
				</div>
			</div>
		`;	
		this._$content = this.shadowRoot.querySelector("#postPanel .panel-content");
			
	}

}

customElements.define('posts-page', PostsPage);