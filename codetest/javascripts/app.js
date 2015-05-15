var Network = {
    Models: {},
    Collections: {},
    Views: {},
    Templates:{}
};

// Models

Network.Models.Post = Backbone.Model.extend({
  parse: function (payload) {
    if (payload.comments) {
      this.comments().set(payload.comments, { parse: true });
      delete payload.comments;
    }

    return payload;
  },

  comments: function() {
    this._comments = this._comments ||
      new Network.Collections.Comments([], {
        post: this
      });
    return this._comments;
  }
});

Network.Models.User = Backbone.Model.extend({
});

Network.Models.Comment = Backbone.Model.extend({
});

// Collections

Network.Collections.Posts = Backbone.Collection.extend({
  url: "./data/posts.json",
  model: Network.Models.Post,
  initialize: function() {
    console.log("posts collect")
  }
});

Network.Collections.Users = Backbone.Collection.extend({
  url: "./data/users.json",
  model: Network.Models.User,
  initialize: function() {
    console.log("users collect")
  }
});

Network.Collections.Comments = Backbone.Collection.extend({
  model: Network.Models.Comment,
  initialize: function() {
    console.log("comment collect")
  }
});

//Templates
Network.Templates.Posts = _.template($("#posts-template").html());
Network.Templates.Post = _.template($("#post-template").html());
Network.Templates.Comment = _.template($("#comment-template").html());
Network.Templates.Form = _.template($("#form-template").html());

// Views
Network.Views.Index = Backbone.View.extend({
  el: $("#page"),
  template: Network.Templates.Posts,

  initialize: function() {
    _.bindAll(this, 'render', 'addPost', 'addAllPosts');
    this.listenTo(this.collection.posts, 'sync', this.render);
    this.listenTo(this.collection.posts, 'add', this.addPost);
  },

  render: function() {
    this.currentUser = this.collection.users.findWhere({id: 5});
    this.showUserIconHeader();
    var view = this.template({ currentUser: this.currentUser })
    $(this.el).html(view);
    this.addAllPosts();
  },

  addPost: function(post){
    var view = new Network.Views.Post({
      model: post,
      collection: this.collection.users
    });
    $("#feed", this.el).append(view.render());
  },

  addAllPosts: function(){
    this.collection.posts.each(this.addPost);
  },

  showUserIconHeader: function(){
    $("#header-icon").html(
      '<img src="' +
      this.currentUser.attributes.pic +
      '" alt="Daniel Craig" id="profile-icon" />'
      );
  }
});

Network.Views.Post = Backbone.View.extend({
  tagName: "li",
  className: "post group",
  template: Network.Templates.Post,
  initialize: function() {
    this.user = this.collection.findWhere({id: this.model.attributes.userId});
    _.bindAll(this, 'render', 'addComment', 'addAllComments');
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.comments(), 'sync', this.render);
    this.listenTo(this.model.comments(), 'add', this.addComment);
  },

  render: function () {
    var view = this.template({
      post: this.model,
      user: this.user
    });
    this.$el.html(view);
    if (this.model.comments().length > 0) {
      $(".comments-wrapper", this.$el).html('<ul class="comments"></ul>');
      this.addAllComments();
    }
    this.addForm();
    return this.$el;
  },

  addAllComments: function() {
    this.model.comments().each(this.addComment);
  },

  addComment: function (comment) {
    var view = new Network.Views.Comment({
      model: comment,
      collection: this.collection
    });
    $(".comments", this.$el).append(view.render());
  },

  addForm: function() {
    var view = new Network.Views.Form({});
    $(".form-wrapper", this.$el).append(view.render());
  }
});

Network.Views.Comment = Backbone.View.extend({
  tagName: "li",
  className: "comment group",
  template: Network.Templates.Comment,
  initialize: function() {
    this.user = this.collection.findWhere({id: this.model.attributes.userId});
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var view = this.template({
      comment: this.model,
      user: this.user
    });
    this.$el.html(view);
    return this.$el;
  }
});

Network.Views.Form = Backbone.View.extend({
  className: "comment-form group",
  template: Network.Templates.Form,

  render: function () {
    var view = this.template({});
    this.$el.html(view);
    return this.$el;
  }
})

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
