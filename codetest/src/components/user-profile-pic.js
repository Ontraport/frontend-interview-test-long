import { BaseComponent } from './base-component.js';

export class UserProfilePic extends BaseComponent {	

	get html(){
		return `
			<div id='wrapper'>
				<img src="${this.src}">
					<slot></slot>
				</img>
			</div>`;
	}

	get style(){
		return `<style>	
				#wrapper {
					display: block;
					width: ${this.width};
					height: ${this.width};
				}
				img {
					border: none;
					width: ${this.width};
					height: ${this.width};
				}
			</style>			
		`;
	}
	
	ReadAttributes(){
		this.src = this.getAttribute("src") || "#";
		this.width = this.getAttribute("width");		
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){
		
	}

	
}

customElements.define('user-profile-pic', UserProfilePic);