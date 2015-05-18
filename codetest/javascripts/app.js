var Network = {
    Models: {},
    Collections: {},
    Views: {},
    Templates:{},
    // Manually set logged in user to user with id 5
    loggedInUserId: 5
};

// Models

Network.Models.Post = Backbone.Model.extend({
  // Parses JSON to check for comments, and creates a collection for them,
  // if comments exist.
  parse: function (payload) {
    if (payload.comments) {
      this.comments(payload.id).set(payload.comments, { parse: true });
      delete payload.comments;
    }

    return payload;
  },

  comments: function(id) {
    // Checks if a comment collection exists and has a valid id, otherwise, make
    // a new collection. This is necessary as when the model is created, a
    // localStorage entry with an undefined id is created.
    if (this._comments && this._comments.postId) {
      return this._comments;
    } else {
      this._comments = createCommentsCollections(id);
    }
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

// Pass in a postId to allow each post's comments collection to have its own
// localStorage.
var createCommentsCollections = function(id){
  Network.Collections.Comments = Backbone.Collection.extend({
    model: Network.Models.Comment,
    localStorage: new Backbone.LocalStorage("commentsStore-" + id),
    initialize: function() {
      this.postId = id;
    }
  });

  return new Network.Collections.Comments
}

//Templates
Network.Templates.Posts = _.template($("#posts-template").html());
Network.Templates.Post = _.template($("#post-template").html());
Network.Templates.Comment = _.template($("#comment-template").html());
Network.Templates.Form = _.template($("#form-template").html());
Network.Templates.Modal = _.template($("#modal-template").html());

// Views
Network.Views.Index = Backbone.View.extend({
  el: $("#page"),
  template: Network.Templates.Posts,

  initialize: function(options) {
    _.bindAll(this, 'render', 'addPost', 'addAllPosts');
    this.listenTo(this.collection.posts, 'sync', this.render);
    this.listenTo(this.collection.posts, 'add', this.addPost);
  },

  render: function() {
    console.log("rendering");
    this.currentUser = this.collection.users.findWhere({id: Network.loggedInUserId});
    this.showUserIconHeader();
    var view = this.template({ currentUser: this.currentUser })
    $(this.el).html(view);
    this.addAllPosts();
    this.addModal();
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

  addModal: function() {
    this.modal = this.modal || new Network.Views.Modal({
      collection: this.collection.posts
    });
    this.modal.render();
  },

  showUserIconHeader: function(){
    $("#header-icon").html(
      '<img src="' +
      this.currentUser.attributes.pic +
      '" alt="' + this.currentUser.attributes.username +
      '" id="profile-icon" />'
    );
  }
});

Network.Views.Post = Backbone.View.extend({
  tagName: "li",
  className: "post group",
  template: Network.Templates.Post,

  initialize: function() {
    this.buildCommentsCollection();
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

    // Only adds the comment ul if comments exists
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
    var view = new Network.Views.Form({
      model: this.model,
      collection: this.collection
    });
    $(".form-wrapper", this.$el).append(view.render());
  },

  buildCommentsCollection: function () {
    this.model.comments().each((function(comment) {
      // Goes through each comment, checks the localStorage records to see if
      // a comment with the same ID already exists, and saves to localStorage
      // if it does not
      if (this.model.comments().localStorage.records
          .indexOf(comment.attributes.id.toString()) === -1) {
        this.model.comments().localStorage.create(comment);
      }
    }).bind(this));

    // Then refetches the comments. Has to be done this way otherwise the
    // the collection built from the JSON file would be overwritten by the
    // localStorage data on fetch
    this.model.comments().fetch();
  }
});

Network.Views.Comment = Backbone.View.extend({
  tagName: "li",
  className: "comment group",
  template: Network.Templates.Comment,

  initialize: function() {
    this.user = this.collection.findWhere({id: this.model.attributes.userId});
  },

  getTimeStamp: function() {
    if (this.model.attributes.date === "") return "";
    var milliseconds = 1000*60*60*24;
    var postDate = new Date(this.model.attributes.date);
    var today = new Date();
    var difference = today - postDate;
    var days = Math.round(difference/milliseconds);
    switch (days) {
      case 0:
        return "Today"
        break;
      case 1:
        return "Yesterday"
        break;
      default:
        return days + " days ago"
    }
  },

  render: function () {
    var view = this.template({
      comment: this.model,
      user: this.user,
      timestamp: this.getTimeStamp()
    });
    this.$el.html(view);
    return this.$el;
  }
});

Network.Views.Form = Backbone.View.extend({
  className: "comment-form group",
  template: Network.Templates.Form,

  events: {
    'keyup .comment-box': 'processKey',
  },

  initialize: function(){
    this.currentUser = this.collection.findWhere({id: Network.loggedInUserId});
  },

  createJSON: function(input) {
    var params = {
      "postId": this.model.attributes.id,
      "userId": this.currentUser.attributes.id,
      "date": new Date(),
      "content": input.trim()
    };

    return params;
  },

  processKey: function(e) {
    if(e.which === 13) {
      var input = e.currentTarget.value;
      var params = this.createJSON(input);
      this.saveComment(params);
    }
  },

  render: function () {
    var view = this.template({});
    this.$el.html(view);
    return this.$el;
  },

  saveComment: function(params) {
    var comment = new Network.Models.Comment(params);
    this.model.comments(this.model.attributes.id).add(comment);
    comment.save();
    comment.fetch();
    this.model.fetch();
  }
});

Network.Views.Modal = Backbone.View.extend({
  el: $('#post-modal'),
  template: Network.Templates.Modal,

  events:{
    'keyup #post-box': 'processKey',
  },

  initialize: function() {
    this.currentUser = this.collection.findWhere({id: Network.loggedInUserId});
  },

  createJSON: function(input) {
    var params = {
      "userId": this.currentUser.attributes.id,
      "date": new Date(),
      "content": input.trim(),
      "comments": []
    };

    return params;
  },

  processKey: function(e) {
    if(e.which === 13) {
      var input = e.currentTarget.value;
      var params = this.createJSON(input);
      this.savePost(params);
      $.modal.close();
    }
  },

  render: function() {
    var view = this.template({});
    this.$el.html(view);
    return this.$el;
  },

  savePost: function(params) {
    var post = new Network.Models.Post(params);
    this.collection.add(post);
    post.save();
    post.fetch();
  }
});

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
      },
    });
    // This first fills the collection with the local JSON data before
    // switching over to local storage

    this.saveToStorageAndFetch(this.usersCollection, "usersStore");
    this.saveToStorageAndFetch(this.postsCollection, "postsStore");
  },

  saveToStorageAndFetch: function (collection, storageName) {
    // Backbone will not combine localStorage data with an existing collection,
    // so we must first save the collection to localStorage, then refetch.
    collection.fetch().done((function() {
      // Sets localStorage name
      collection.localStorage = new Backbone.LocalStorage(storageName);
      collection.each((function(model) {
        // Checks to see if model already exists in localStorage
        if (collection.localStorage.records
            .indexOf(model.attributes.id.toString()) === -1) {
          // Saves to local storage if it doesn't exist
          collection.localStorage.create(model);
        }
      }).bind(this));

      // Refetches the collection, this time using the data from localStorage.
      collection.fetch();
    }).bind(this));
  }
});

var appRouter = new Network.Router();
Backbone.history.start();
// have to run http server to get json reading working locally. http-server -c-1
