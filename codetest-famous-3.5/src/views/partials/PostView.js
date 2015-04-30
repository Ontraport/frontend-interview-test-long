'use strict'

var EventHandler = require('famous/core/EventHandler'),
    CommentModel = require('./../../models/CommentModel'),
    PostService = require('./../../services/PostService'),
    AppService = require('./../../services/AppService');

function PostView(model) {
    EventHandler.call(this);

    var _this = this;

    this._model = {
        id: null,
        pic: '',
        username: '',
        text: '',
        comments: []
    };

    // content

    this._content = document.createElement('div');
    this._content.className = 'block post';

    // post comment input element
    this._commentInput = document.createElement('input');
    this._commentInput.type = 'text';
    this._commentInput.className = 'block comment-input';
    this._commentInput.placeholder = 'post a comment';

    // add a new comment on enter
    this._commentInput.addEventListener('keydown', function(e) {
        if (e.which === 13) {
            if (this.value.trim().length > 0) {
                // insert to local storage
                var user = AppService.getUser();
                PostService.addComment(new CommentModel(user.id, _this._model.id, this.value));

                // add to view
                _this.addComment({
                    username: user.username,
                    pic: user.pic,
                    text: this.value
                });

                this.value = '';
            }
        }
    });

    // render entire post
    this.setModel(model);
}

PostView.prototype = Object.create(EventHandler.prototype);
PostView.constructor = PostView;

PostView.prototype.setModel = function(model) {
    this._model.pic = 'assets/' + model.pic;
    this._model.username = model.username;
    this._model.text = model.text;
    this._model.id = model.id;

    if (model.comments &&
        model.comments.length > 0) {
        for (var i = 0, n = model.comments.length; i < n; ++i) {
            this._model.comments.push(model.comments[i]);
        }
    }

    this._render();
};

PostView.prototype.show = function() {
    this._content.style.display = 'block';
}

PostView.prototype.hide = function() {
    this._content.style.display = 'none';
}

PostView.prototype._render = function() {
    this._content.innerHTML = [
        '<img class="user-icon-normal top" src=',
        this._model.pic,
        ' />',
        '<div class="inline-block post-body">',
        '<p class="link bold no-spacing">',
        this._model.username,
        '</p>',
        '<p class="no-spacing">',
        this._model.text,
        '</p>',
        '</div>'
    ].join('');

    // Add input to post a comment
    this._content.appendChild(this._commentInput);

    // insert comments
    for (var i = 0, n = this._model.comments.length; i < n; ++i) {
        this.addComment(this._model.comments[i]);
    }

    return this._content;
};

PostView.prototype.toString = function() {
    return JSON.stringify(this._model).toLowerCase();
};

PostView.prototype.addComment = function(commentModel) {
    var commentNode = document.createElement('div');
    commentNode.className = 'comment block';
    commentNode.innerHTML = [
        '<img class="user-icon-small top" src=assets/',
        commentModel.pic,
        ' />',
        '<div class="inline-block comment-body">',
        '<p class="link bold no-spacing">',
        commentModel.username,
        '</p>',
        '<p class="no-spacing">',
        commentModel.text,
        '</p>',
        '</div>'
    ].join('');

    this._model.comments.push(commentModel);

    // add to post
    this._content.insertBefore(commentNode, this._commentInput);
};

PostView.prototype.getContent = function() {
    return this._content;
};


module.exports = PostView;
