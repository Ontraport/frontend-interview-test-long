class UserAccountPanel extends BaseComponent {	

	get style(){
		return `			
			<style>
				#accountPanel {
					width: 250px;
					height: auto;
				}

				#accountPanel .profile-pic {
					margin: 0 5px 0 0;
				}
			</style>`;
	}

	get html(){
		return `
			<div id="accountPanel" class="panel">
				<div class="panel-content">
					<div class="profile-pic">
						<user-profile-pic width="50px" src="${this.user_pic}" />
					</div>
					<h2 class="profile-name">
						${this.user_name}
					</h2>
				</div>
			</div>			
		`;
	}	
	ReadAttributes(){
		this.user_id = this.getAttribute("data-user-id");
		this.user_pic = this.getAttribute("data-user-pic");
		this.user_name = this.getAttribute("data-user-name");	
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){
		
	}
}

customElements.define('user-account-panel', UserAccountPanel);