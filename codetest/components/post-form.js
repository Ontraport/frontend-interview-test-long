class PostForm extends BaseComponent {	
	
	get html(){
		return `
			<form method="get" action="#">
				<textarea rows="5" type="text" name="post-text" placeholder="${this.placeholder}"></textarea>
				<p class='errorText'></p>
				<br />
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
			.errorText { color: red; float: left; }
			</style>`;
	}
	ReadAttributes(){	
		this.placeholder = this.getAttribute("data-placeholder");
		this.button_text = this.getAttribute("data-button-text");		
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){		
		var $this = this;	
		
		this.form = this.shadowRoot.querySelector("form");
		this.textarea = this.shadowRoot.querySelector("textarea");
		this.errorText = this.shadowRoot.querySelector(".errorText");
		
		var $this = this;
		var submitForm = function(e){
			$this.errorText.innerHTML = "";
			e.preventDefault();	
			var content = $this.form["post-text"].value;
			if(content.length >= 3 && content.length <= 256){				
				PostsController.AddPost(content);
				$this.textarea.value = "";
				var event = new Event("submit");
				$this.dispatchEvent(new CustomEvent('form-submit', {
					bubbles: true,
					composed: true,
					detail: "composed"
				}));
			} else {
				$this.errorText.innerHTML = "Post must be between 3 and 256 characters";
				e.cancelBubble = true;
			}
			return false;
		}
		
		this.textarea.addEventListener("keydown", function(e){			
			$this.errorText.innerHTML = "";		
			if(e.code == "Enter" || e.code == "NumpadEnter"){
				e.preventDefault();
			}
		});
		this.textarea.addEventListener("keyup", function(e){					
			if(e.code == "Enter" || e.code == "NumpadEnter"){
				e.preventDefault();
				submitForm(e);
			}
		});
		
		this.form.onsubmit = function(e){
			e.preventDefault();
			submitForm(e);
		}
		
		
	}	
}

customElements.define('post-form', PostForm);