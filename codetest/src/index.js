import './normalize.css';
import './styles.css';

import { DataStore } from './js/DataStore.js';
import { PostsController } from './js/PostsController.js';
import { PostsPage } from './components/posts-page.js';
import { PageMenu } from'./components/page-menu.js'
import { GetCurrentUser } from'./js/CurrentUser.js'
import UserData from './data/users.json'
import PostData from './data/posts.json'

var CurrentUser = null;

window.onload = function(e){
	
	LoadData();
	SetUser();
	Render();		
}


function LoadData(){		

	var ls = window.localStorage;		
	if (ls.getItem('Users') == null) {
		ls.setItem("Users", JSON.stringify(UserData));
	}
	if (ls.getItem('Posts') == null) {
		ls.setItem("Posts", JSON.stringify(PostData));
	}	
}

function SetUser(){	
	CurrentUser = GetCurrentUser();
}

function Render(){	
	RenderPage();
	RenderHeader();
	
}

function RenderPage(){	
	var attributes = [];	
	attributes["data-user-id"] = CurrentUser.id;	
	attributes["data-user-name"] = CurrentUser.username;
	attributes["data-user-pic"] = CurrentUser.pic;	
	
	RenderElement("#page", "posts-page", attributes);
}

function RenderHeader(){		
	var attributes = [];	
	attributes["data-user-id"] = CurrentUser.id;	
	attributes["data-user-pic"] = CurrentUser.pic;	
	
	RenderElement("#header", "page-menu", attributes);
}

function RenderElement(containerSelector, elementTag, attributes){
	var container = document.querySelector(containerSelector);
	var elem = document.createElement(elementTag);

	var keys = Object.keys(attributes);
	for (let key of keys) {
		elem.setAttribute(key, attributes[key]);			
	}
	
	container.appendChild(elem);
}


function loadJSON(path) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', path, true);
	xhr.responseType = 'blob';
	xhr.onload = function(e) { 
	  if (this.status == 200) {
		  var file = new File([this.response], 'temp');
		  var fileReader = new FileReader();
		  fileReader.addEventListener('load', function(){
			   console.log(fileReader.result);
		  });
		  fileReader.readAsText(file);
	  } 
	}
	xhr.send();
}