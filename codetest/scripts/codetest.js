$(function (){
window.Codetest = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {}
};

window.Codetest.Models.Post = Backbone.Model.extend({
	defaults:{
		id: null,
		userId: null,
		date: null,
		content: null,
		comments: []
	}
});


window.Codetest.Collections.Posts = Backbone.Collection.extend({
	url: "posts.json",
	model: Codetest.Models.Post,
	parse: function (res){
		return res;
	}
});


window.Codetest.Views.PostIndex = Backbone.View.extend({
	template: _.template("HI"),
	
	initialize: function () {
		this.listenTo(this.collection, "add change:title remove reset", this.render)
	},
	
	render: function () {
		var renderedContent = this.template({
			posts: this.collection
		});
		this.$el.html(renderedContent);
		return this;
	}
});

Codetest.Collections.posts = new Codetest.Collections.Posts();
Codetest.Collections.posts.fetch({
    success: function(data) {
		console.log(data);
      },
    error: function(){
       console.log('error');
    }
  })


window.Codetest.Routers.GetRouter = Backbone.Router.extend({
	routes: {
		"": "postsIndex",
		"posts/new": "postsNew"
	},
	
	postsIndex: function() {
		var indexView = new Codetest.Views.PostIndex({
			collection: Codetest.Collections.posts
			//users: Codetest.Collections.users
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
});

window.Codetest.initialize = function () {
		new Codetest.Routers.GetRouter();
		Backbone.history.start();
	}
});

