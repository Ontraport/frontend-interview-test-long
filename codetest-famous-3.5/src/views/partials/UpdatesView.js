'use strict'

var EventHandler = require('famous/core/EventHandler'),
    PostService = require('./../../services/PostService'),
    UserService = require('./../../services/UserService'),
    PostView = require('./PostView');

function UpdatesView() {
    EventHandler.call(this);

    var _this = this;

    this._model = {
        posts: [],
    };
    this._searchQuery = '';

    this._content = document.createElement('div');
    this._content.className = 'inline-block container updates';

    // special case
    // I should do this all in some service I guess since not merged from backend services

    this._mergeUserData = function(posts, users) {
        var merged = [];
        for (var i = 0, n = posts.length; i < n; ++i) {
            for (var j = 0, nn = users.length; j < nn; ++j) {
                if (posts[i].userId === users[j].id) {
                    merged.push({
                        id: posts[i].id,
                        username: users[j].username,
                        pic: users[j].pic,
                        text: posts[i].content,
                    });
                }
            }
        }
        return merged;
    };

    // bandaid

    // inject posts to the updates view
    PostService.fetchPosts().then(function(posts) {
        // join user and post data
        // this should be on the backend
        UserService.fetchUsers().then(function(users) {
            var mergedPosts = _this._mergeUserData(posts, users);
            for (var i = 0, n = mergedPosts.length; i < n; ++i) {
                mergedPosts[i].comments = _this._mergeUserData(posts[i].comments, users);
            }

            // set model
            _this.setModel({
                posts: mergedPosts
            });
        });
    });
}

UpdatesView.prototype = Object.create(EventHandler.prototype);
UpdatesView.constructor = UpdatesView;

UpdatesView.prototype.setModel = function(model) {
    if (model.posts &&
        model.posts.length > 0) {
        this._model.posts = [];
        for (var i = 0, n = model.posts.length; i < n; ++i) {
            this._createPost(model.posts[i]);
        }
    }

    this._render();
    // this.search(this._searchQuery);
};

UpdatesView.prototype._render = function() {
    this._content.innerHTML = '<div class="bold updates-header">Updates</div>';

    for (var i = 0, n = this._model.posts.length; i < n; ++i) {
        var postView = this._model.posts[i];
        // add to post
        this._content.appendChild(postView.getContent());
    }
};

UpdatesView.prototype._createPost = function(postModel) {
    var postView = new PostView(postModel);

    this._model.posts.push(postView);

    return postView;
};

UpdatesView.prototype.addPost = function(postModel) {
    var postView = this._createPost(postModel);

    this._content.appendChild(postView.getContent());

    this.search(this._searchQuery);
};

UpdatesView.prototype.search = function(query) {
    this._searchQuery = query;
    for (var i = 0, n = this._model.posts.length; i < n; ++i) {
        if (this._model.posts[i].toString().indexOf(query) !== -1) {
            this._model.posts[i].show();
        } else
            this._model.posts[i].hide();
    }
};

UpdatesView.prototype.getContent = function() {
    return this._content;
};

module.exports = new UpdatesView();
