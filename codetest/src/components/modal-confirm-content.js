import { BaseComponent } from './base-component.js';

export class ModalConfirmContent extends BaseComponent {	

	get html(){
		return `
			<div id='wrapper'>
				<p>${this.question}</p> 
				<hr />
				${this.content} 
				<hr />
				<a href="javascript:void(0);" class='confirm button button-primary floatright'>${this.confirmText}</a> 
				<a href="javascript:void(0);" class="close-modal button floatright">${this.cancelText}</a>				
			</div>`;
	}

	get style(){
		return `
		<style>
		#wrapper hr {
			border: none;
			height: 1px;
			background-color: #d8d8d8;
			margin: .5em -.2em;
		}
		</style>`;
	}
	
	ReadAttributes(){	
		this.question = this.getAttribute("data-question");
		this.content = this.getAttribute("data-content");
		this.confirmText = this.getAttribute("data-confirm-text");
		this.cancelText = this.getAttribute("data-cancel-text");
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){		

	}

	
	
}

customElements.define('modal-confirm-content', ModalConfirmContent);