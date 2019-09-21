import { BaseComponent } from './base-component.js';

export class PageModal extends BaseComponent {	
	get html(){
		return `
			<div id="target" class="modal">
				<div class="modal-wrapper">
					<div class='modal-header'>
						${this.title}
					</div>
					<div class='modal-content'>
						<slot></slot>
					</div>
				</div>
			</div>
		`;		
	}
	
	get style(){
		return `
			<style>								
			.modal {
				display: none;
			}
			.modal.modal-active {
				display: block;
				position: fixed;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				width: 100%;
				height: 100%;
				background-color: rgba(255, 255, 255, .5);
				z-index: 99999;
			}

			.modal .modal-wrapper {
				display: block;
				position: fixed;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;		
				margin: auto;
				width: 400px;
				height: 200px;
				background-color: rgb(247, 247, 247);
				border-radius: 5px;
				z-index: 99999;
				box-shadow: 0 0 5px rgba(0, 0, 0, .2);
			}

			.modal .modal-header {
				font-size: 1.1em;
				padding: 10px;
				text-align: center;
				border-bottom: 2px solid #eee;
				color: #222;
			}

			.modal .modal-content {
				padding: 10px;
			}
			</style>`;
	}
	
	ReadAttributes(){	
		this.title = this.getAttribute("data-title");			
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){		
		var $this = this;
		
		this.triggerElement = this.shadowRoot.host.parentNode;
		this.targetElement = this.shadowRoot.querySelector("#target");
		
		this.triggerElement.addEventListener("click", function(e){
			if(e.path[0] != $this.targetElement){
				$this.openModal();
			}
		});
		
		var downTarget = null;
		this.targetElement.addEventListener("mousedown", function(e){		
			downTarget = e.path[0];		
		});
		this.targetElement.addEventListener("click", function(e){					
			if(downTarget == $this.targetElement){
				$this.closeModal();
			}
		});		
		
				
		var closeTriggers = this.targetElement.querySelectorAll(".close-modal");		
		if(typeof closeTriggers != "undefined"){
			for(var k = 0; k < closeTriggers.length; k++){
				closeTriggers[k].addEventListener("click", function(e){
					$this.closeModal();
				});
			}
		}		
		
		this.shadowRoot.addEventListener("form-submit", function(e){			 
			$this.closeModal();						
		});
	}	

	openModal(){
		this.targetElement.classList.add("modal-active");
	}
	closeModal(){
		var elem = this.shadowRoot.host;
		elem.parentNode.removeChild(elem);
	}
}

customElements.define('page-modal', PageModal);