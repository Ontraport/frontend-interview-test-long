window.Codetest.Collections.Posts = Backbone.Collection.extend({
	url: "../data/posts.json",
	model: Codetest.Models.Post,
	
	getOrFetch: function(id) {
	  	var post = this.get(id)
	  	var posts = this
	  	if(!post){
	  		post = new Codetest.Models.Post({ id: id })
	  		post.fetch({
	  			success: function(){
	  				posts.add(post)
	  			}
	  		})
	  	} else {
	  		post.fetch()
	  	}

	  	return post
	  }
});

Codetest.Collections.posts = new Codetest.Collections.Posts();
Codetest.Collections.posts.fetch();