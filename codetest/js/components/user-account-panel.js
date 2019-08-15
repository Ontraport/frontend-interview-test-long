class UserAccountPanel extends HTMLElement {	

	constructor(){
		super();
		this.attachShadow({mode: "open"});
		this._$div = null;
	}

	connectedCallback(){
		const user_id = this.getAttribute("data-user-id");
		const user_pic = this.getAttribute("data-user-pic");
		const user_name = this.getAttribute("data-user-name");
		this.shadowRoot.innerHTML = `			
			<style>
			h2, h3 {
				display: inline-block;
				padding: 0;
				margin: 0;
			}

			h2 {
				font-size: 1em;
				font-weight: normal;
			}

			h3 {
				font-weight: bold;
				color: #0279c9;
				font-size: 1em;
			}
			#accountPanel {
				width: 250px;
				height: auto;
			}

			#accountPanel .profile-pic {
				margin: 0 5px 0 0;
			}
			.panel {
				background-color: #f7f7f7;
				border-radius: 5px;
				display: block;
			}

			.panel-content {
				padding: 5px;
			}
			.profile-pic {
				margin: 0 15px 0 0;
				display: inline-block;
			}
			.profile-pic img {
				width: 50px;
			}

			</style>
			<div id="accountPanel" class="panel">
				<div class="panel-content">
					<div class="profile-pic">
						<user-profile-pic width="50px" src="${user_pic}" />
					</div>
					<h2 class="profile-name">
						${user_name}
					</h2>
				</div>
			</div>			
		`;
		this._$div = this.shadowRoot.querySelector("#accountPanel");		
	}
	
}

customElements.define('user-account-panel', UserAccountPanel);