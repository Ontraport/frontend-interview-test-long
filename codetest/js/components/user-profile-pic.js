class UserProfilePic extends HTMLElement {	

	constructor(){
		super();
		this.attachShadow({mode: "open"});
		this._$img = null;
	}

	connectedCallback(){
		console.log("connected");
		const src = this.getAttribute("src") || "#";
		const width = this.getAttribute("width");
		this.shadowRoot.innerHTML = `
			<style>			
				img {
					border: none;
					width: ${width};
					height: ${width};
				}
			</style>
			<img src="${src}">
				<slot></slot>
			</img>
		`;
		this._$img = this.shadowRoot.querySelector("img");		
	}
	
	static get observedAttributes() { return ["src"]; }
	
	attributeChangedCallback(name, oldValue, newValue) {
		console.log(name + " changed to " + newValue);			
		if (oldValue !== newValue) {
			if (this._$img === null) return;
			this._$img.setAttribute("src", newValue);	
		}
	}
	
}

customElements.define('user-profile-pic', UserProfilePic);