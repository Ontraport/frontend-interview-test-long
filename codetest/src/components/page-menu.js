import { BaseComponent } from './base-component.js';
import { UserProfilePic } from './user-profile-pic.js';
import { PostForm } from './post-form.js';
import { PageModal } from './page-modal.js';

export class PageMenu extends BaseComponent {	

	get style(){
		return `			
			<style>				
				#menu {
					float: right;
					margin: 0 24px 0 0;
				}

				#menu ul {	
					list-style-type: none;
					display: table;
				}

				#menu ul li {
					display: table-cell;
					padding: 0 10px;
					vertical-align: middle;
				}

				#menu a {
					color: white;
					text-decoration: none;
					font-size: 1.2em;
					display: block;
				}

				#menu a img {
					border: none;
					width: 25px;
					height: 25px;
				}
			</style>`;
	}

	get html(){
		return `
			<div id="menu">
				<ul>
					<li><a href='/' onclick="">Home</a></li>
					<li>
						<a href='javascript:void(0);' id="postAnUpdate">
							Post an update							
						</a>
					</li>
					<li><a href='javascript:void(0)' onclick=""><user-profile-pic width="25px" src="${this.user_pic}" /></a></li>
				</ul>
			</div>		
		`;
	}	
	ReadAttributes(){	
		this.user_id = this.getAttribute("data-user-id");
		this.user_pic = this.getAttribute("data-user-pic");
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){		
		var $this = this;			
		var postLink = this.shadowRoot.querySelector("#postAnUpdate");
		postLink.addEventListener("click", function(e){			
			var modal = document.createElement("page-modal");
			modal.setAttribute("data-title", "Post an Update");			

			var postForm = document.createElement("post-form");
			postForm.setAttribute("data-placeholder", "post an update");
			postForm.setAttribute("data-button-text", "Post");			
			modal.appendChild(postForm);			
			
			document.body.appendChild(modal);	
		});
	}
	
}

customElements.define('page-menu', PageMenu);