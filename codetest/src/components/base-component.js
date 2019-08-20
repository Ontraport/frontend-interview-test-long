import { mainCSS } from'../shadowCSS.js'

export class BaseComponent extends HTMLElement {	
	
	get html(){
		return ``;
	}
	
	get style(){
		return ``;
	}

	constructor(){
		super();
		this.attachShadow({mode: "open"});
        this.shadowRoot.adoptedStyleSheets = [mainCSS];
	}

	ReadAttributes(){
		
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){
		
	}
		
	connectedCallback(){
		this.ReadAttributes();
		this.Render();
		this.AttachEvents();
	}	
	
	querySelector(query){
		return this.shadowRoot.querySelector(query);
	}
}

customElements.define('base-component', BaseComponent);