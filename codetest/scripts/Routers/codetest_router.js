GetRouter = Backbone.Router.extend({
	routes: {
		"": "postsIndex",
		"posts/new": "postsNew"
	},
	
	postsIndex: function() {
		var indexView = new Codetest.Views.PostIndex({
			collection: Codetest.Collections.posts
			users: Codetest.Collections.users
		});
		this._swapView(indexView);
	},
	
	postsNew: function () {
		var newView = new Codetest.Views.PostsNew();
		this._swapView(newView);
	},
	
	_swapView: function (newView) {
		if (this.currentView){
			this.currentView.remove();
		}
		
		$("#content").append(newView.render().$el);
		
		this.currentView = newView;
	}
})
