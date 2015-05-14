var Network = {
    Models: {},
    Collections: {},
    Views: {},
    Templates:{}
};

// Models

Network.Models.Post = Backbone.Model.extend({

});

Network.Models.User = Backbone.Model.extend({

});

// Collections

Network.Collections.Posts = Backbone.Collection.extend({
  url: "../data/posts.json",
  model: Network.Models.Post,
  initialize: function() {
    console.log("posts collect")
  }
});

Network.Collections.Users = Backbone.Collection.extend({
  url: "../data/users.json",
  model: Network.Models.User,
  initialize: function() {
    console.log("users collect")
  }
});

//Templates
Network.Templates.posts = _.template($("#posts-template").html());
Network.Templates.post = _.template($("#post-template").html());
// Network.Templates.comment = _.template($("#comment-template").html());

// Views
Network.Views.Index = Backbone.View.extend({
  el: $("#page"),
  template: Network.Templates.posts,

  initialize: function() {
    _.bindAll(this, 'render', 'addPost', 'addAllPosts');
    this.listenTo(this.collection.posts, 'sync', this.render);
    this.listenTo(this.collection.posts, 'add', this.addPost);
  },

  render: function() {
    console.log("render");
    console.log(this.collection.users.length);
    console.log(this.collection.posts.length);
    $(this.el).html(this.template());
    // debugger;
    this.addAllPosts();
  },

  addPost: function(post){
    console.log("addPost");
    var view = new Network.Views.post({
      model: post,
      collection: this.collection.users
    });
    // debugger;
    $("#feed", this.el).append(view.render());
  },

  addAllPosts: function(){
    console.log("addAllPosts");
    this.collection.posts.each(this.addPost);
  }
});

Network.Views.post = Backbone.View.extend({
  tagName: "li",
  className: "post group",
  template: Network.Templates.post,
  initialize: function(options) {
    this.user = this.collection.findWhere({id: this.model.attributes.userId});
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      post: this.model,
      user: this.user
    });
    this.$el.html(content);
    return this.$el;
  }
});

// Network.Views.comment = Backbone.View.extend({
//   tagName: "li",
//   template: Network.Templates.comment,
//
// })

// Router

Network.Router = Backbone.Router.extend({
  routes: {
    "" : "index"
  },

  initialize: function () {
    this.usersCollection = new Network.Collections.Users();
    this.postsCollection = new Network.Collections.Posts();
  },

  index: function() {
    var view = new Network.Views.Index({
      collection: {
        users: this.usersCollection,
        posts: this.postsCollection
      }
    });

    this.usersCollection.fetch();
    this.postsCollection.fetch();
  }

});

var appRouter = new Network.Router();
Backbone.history.start();
// have to run http server to get json reading working locally. http-server -c-1
