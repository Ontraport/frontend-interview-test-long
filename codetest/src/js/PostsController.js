import { DataStore } from './DataStore.js';

export const PostsController = {
	"ls" : window.localStorage,
	"PostsPage" : null,
	
	"AddPost" : function(userId, content) {
		var post = {
			"id" : 0,
			"userId": userId,
			"date" : Date.now(),
			"content": content,
			"comments" : []
			
		}	
		
		DataStore.AddData("Posts", post);
		if(this.PostsPage != null) {
			this.PostsPage.AddPost(post);
		}				
	},
	
	
	"AddComment" : function(userId, postId, content){
		var comment = {
			"id" : 0,
			"userId": userId,
			"postId": postId,
			"date" : Date.now(),
			"content": content			
		}	
		
		var PostsData = DataStore.GetTableData("Posts");
		
		if(PostsData != null && PostsData[postId - 1] != null){
			comment.id = PostsData[postId - 1].comments.length;
			PostsData[postId - 1].comments.push(comment);		
			DataStore.SaveTableData("Posts", PostsData);			
			this.PostsPage.OnCommentAdded(comment);
		}							
	},
	"DeletePost" : function(postId, UserPostElement){
		
		var PostsData = DataStore.GetTableData("Posts");
		
		if(PostsData != null && PostsData[postId - 1] != null){
			PostsData = this.DeleteFromArray(PostsData, postId - 1);
			DataStore.SaveTableData("Posts", PostsData);			
			UserPostElement.OnDeleted();
		}							
	},
	
	"DeleteComment" : function(postId, commentId, UserCommentElement){
		var PostsData = DataStore.GetTableData("Posts");
		
		if(PostsData != null && PostsData[postId - 1] != null){
			for(var i = 0; i < PostsData[postId-1].comments.length; i++){
				if(PostsData[postId-1].comments[i].id == commentId){
					PostsData[postId-1].comments.splice(i, 1);
				}
			}			
			DataStore.SaveTableData("Posts", PostsData);			
			UserCommentElement.OnDeleted();
		}							
	},
	
	"DeleteFromArray" : function(dataSet, index){
		if(index == dataSet.length - 1){
			dataSet.splice(index, 1);
		} else {
			dataSet[index] = null;
		}
		return dataSet;
	}
	
	
	
}