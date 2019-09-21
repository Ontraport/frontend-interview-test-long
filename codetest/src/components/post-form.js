import { BaseComponent } from './base-component.js';
import { GetCurrentUser } from'../js/CurrentUser.js'
import { postsController } from '../js/PostsController.js';

export class PostForm extends BaseComponent {	
	
	get html(){
		return `
			<form method="get" action="#">
				<textarea rows="5" type="text" name="post-text" placeholder="${this.placeholder}" autofocus maxlength="${this.maxLength}"></textarea>
				<p class='errorText'></p>
				<input type="submit" class='close-modal button button-primary' value="${this.button_text}"/>
			</form>
		`;
	}
	
	get style(){
		return `
			<style>
			textarea {
				width: 98%;		
				background-color: #fefefe;
				border-color: #ddd;
				color: #333;
			}
			input[type=submit] {
				float: right;
				margin-top: 1em;
			}
			.errorText { color: #33d; float: left; }
			.errorText.error { color: red; }
			.errorText.valid { color: green;}
			</style>`;
	}
	ReadAttributes(){	
		this.CurrentUser = GetCurrentUser();
		this.placeholder = this.getAttribute("data-placeholder");
		this.button_text = this.getAttribute("data-button-text");		
		this.maxLength = 256;
		this.minLength = 1;
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){		
		var $this = this;	
		
		this.form = this.shadowRoot.querySelector("form");
		this.textarea = this.shadowRoot.querySelector("textarea");
		this.errorText = this.shadowRoot.querySelector(".errorText");
		setTimeout(function(){ $this.textarea.focus(); }, 0);
		var $this = this;
		var submitForm = function(e){
			$this.errorText.innerHTML = "";
			e.preventDefault();	
			console.log("submitted");
			var content = $this.form["post-text"].value;
			if(content.length >= $this.minLength && content.length <= $this.maxLength){				
				postsController.AddPost($this.CurrentUser.id, content);
				$this.textarea.value = "";
				var event = new Event("submit");
				$this.dispatchEvent(new CustomEvent('form-submit', {
					bubbles: true,
					composed: true,
					detail: "composed"
				}));
			} else {
				$this.errorText.classList.remove("valid");
				$this.errorText.classList.add("error");
				$this.errorText.innerHTML = "Post must be between " + $this.minLength + " and " + $this.maxLength + " characters";
				e.cancelBubble = true;
			}
			return false;
		}
		
		this.textarea.addEventListener("keydown", function(e){		
			if(e.code == "Enter" || e.code == "NumpadEnter"){
				e.preventDefault();
			}
		});
		this.textarea.addEventListener("keyup", function(e){					
			if(e.code == "Enter" || e.code == "NumpadEnter"){
				e.preventDefault();
				submitForm(e);
			} else {
				var charsLeft = ($this.maxLength - this.value.length);
				if(this.value.length < $this.minLength){
					$this.errorText.classList.remove("valid");
					$this.errorText.classList.remove("error");
					$this.errorText.innerHTML = "Be excellent!";
				} else if(charsLeft > 0){
					$this.errorText.classList.add("valid");
					$this.errorText.innerHTML = charsLeft + " characters available";
				} else if(charsLeft == 0){
					$this.errorText.classList.remove("valid");
					$this.errorText.innerHTML = "Maximum size reached";
				} else {
					$this.errorText.classList.remove("valid");
					$this.errorText.classList.add("error");
					$this.errorText.innerHTML = -charsLeft + " too many characters";
				}
			}
		});
		
		this.form.onsubmit = function(e){
			console.log("form submit");
			e.preventDefault();
			submitForm(e);
		}
		
		
	}	
}

customElements.define('post-form', PostForm);