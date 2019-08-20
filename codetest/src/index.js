import './normalize.css';
import './styles.css';

import { dataStore } from './js/DataStore.js';
import { postsController } from './js/PostsController.js';
import { PostsPage } from './components/posts-page.js';
import { PageMenu } from'./components/page-menu.js'
import { GetCurrentUser } from'./js/CurrentUser.js'
import UserData from './data/users.json'
import PostData from './data/posts.json'

class PostsApp {
	constructor(target){
		this.CurrentUser = null;
		this.targetElement = target;
		this.LoadData();
		this.SetUser();
		this.Render();	
	}
	
	LoadData(){		

		var ls = window.localStorage;		
		if (ls.getItem('Users') == null) {
			ls.setItem("Users", JSON.stringify(UserData));
		}
		if (ls.getItem('Posts') == null) {
			ls.setItem("Posts", JSON.stringify(PostData));
		}	
	}

	SetUser(){	
		this.CurrentUser = GetCurrentUser();
	}

	Render(){	
		this.RenderPage();
		this.RenderHeader();		
	}

	RenderPage(){	
		var attributes = [];	
		attributes["data-user-id"] = this.CurrentUser.id;	
		attributes["data-user-name"] = this.CurrentUser.username;
		attributes["data-user-pic"] = this.CurrentUser.pic;	
		
		this.RenderElement(this.targetElement, "posts-page", attributes);
	}

	RenderHeader(){		
		var attributes = [];	
		attributes["data-user-id"] = this.CurrentUser.id;	
		attributes["data-user-pic"] = this.CurrentUser.pic;	
		
		this.RenderElement("#header", "page-menu", attributes);
	}

	RenderElement(containerSelector, elementTag, attributes){
		var container = document.querySelector(containerSelector);
		var elem = document.createElement(elementTag);

		var keys = Object.keys(attributes);
		for (let key of keys) {
			elem.setAttribute(key, attributes[key]);			
		}
		
		container.appendChild(elem);
	}
}




window.onload = function(e){
	var postsApp = new PostsApp("#page");
	
}