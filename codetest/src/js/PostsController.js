import { dataStore } from './DataStore.js';

class PostsController {
	constructor(){
		this.ls = window.localStorage;
		this.PostsPage = null;
	}
	
	AddPost(userId, content) {
		var post = {
			"id" : 0,
			"userId": userId,
			"date" : Date.now(),
			"content": content,
			"comments" : []			
		}	
		
		dataStore.AddData("Posts", post);
		if(this.PostsPage != null) {
			this.PostsPage.AddPost(post);
		}				
	}	
	
	AddComment(userId, postId, content){
		var comment = {
			"id" : 0,
			"userId": userId,
			"postId": postId,
			"date" : Date.now(),
			"content": content			
		}	
		
		var PostsData = dataStore.GetTableData("Posts");
		
		if(PostsData != null && PostsData[postId - 1] != null){
			comment.id = PostsData[postId - 1].comments.length;
			PostsData[postId - 1].comments.push(comment);		
			dataStore.SaveTableData("Posts", PostsData);			
			this.PostsPage.OnCommentAdded(comment);
		}							
	}
	DeletePost(postId, UserPostElement){
		
		var PostsData = dataStore.GetTableData("Posts");
		
		if(PostsData != null && PostsData[postId - 1] != null){
			PostsData = this.DeleteFromArray(PostsData, postId - 1);
			dataStore.SaveTableData("Posts", PostsData);			
			UserPostElement.OnDeleted();
		}							
	}
	
	DeleteComment(postId, commentId, UserCommentElement){
		var PostsData = dataStore.GetTableData("Posts");
		
		if(PostsData != null && PostsData[postId - 1] != null){
			for(var i = 0; i < PostsData[postId-1].comments.length; i++){
				if(PostsData[postId-1].comments[i].id == commentId){
					PostsData[postId-1].comments.splice(i, 1);
				}
			}			
			dataStore.SaveTableData("Posts", PostsData);			
			UserCommentElement.OnDeleted();
		}							
	}
	
	DeleteFromArray(dataSet, index){
		if(index == dataSet.length - 1){
			dataSet.splice(index, 1);
		} else {
			dataSet[index] = null;
		}
		return dataSet;
	}	
}

export const postsController = new PostsController();