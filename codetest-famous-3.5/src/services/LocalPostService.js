'use strict'

var
//Local
    CommentModel = require('./../models/CommentModel'),
    PostModel = require('./../models/PostModel');

function LocalPostService() {
    this._savePosts = function(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
    };

    this._saveComments = function(comments) {
        localStorage.setItem('comments', JSON.stringify(comments));
    };

    this.fetchPosts = function() {
        var posts = localStorage.posts;
        return posts ? JSON.parse(localStorage.posts) : [];
    };

    this.fetchComments = function() {
        var comments = localStorage.comments;
        return comments ? JSON.parse(localStorage.comments) : [];
    };

    this.addPost = function(postModel) {
        var _this = this;

        if (postModel instanceof PostModel) {
            var localCount = _this.getPostCount();
            postModel.id = localCount + postModel.id + 1;

            var posts = _this.fetchPosts();
            posts.push(postModel);
            _this._savePosts(posts);
        }
        return postModel;
    };

    this.deletePost = function(postId) {
        var posts = this.fetchPosts();
        for (var i = 0, n = posts.length; i < n; ++i) {
            if (posts[i].id === postId) {
                posts.splice(i, 1);
                break;
            }
        }
        this._savePosts(posts);
    };

    this.addComment = function(commentModel) {
        var _this = this;
        if (commentModel instanceof CommentModel) {
            var posts = this.fetchPosts();
            var found = false;
            // set id
            commentModel.id = _this.getCommentCount() + commentModel.id + 1;
            // add to local storage post if new post
            for (var i = 0, n = posts.length; i < n; ++i) {
                if (posts[i].id === commentModel.postId) {
                    found = true;
                    // Save the comment.
                    posts[i].comments.push(commentModel);
                    _this._savePosts(posts);
                    break;
                }
            }
            // else store in separate comments storage to append to database when online
            if (!found) {
                var comments = this.fetchComments();
                comments.push(commentModel);
                this._saveComments(comments);
            }
        }
        return commentModel;
    };

    this.clear = function() {
        localStorage.removeItem('posts');
        localStorage.removeItem('comments');
    };

    this.getPostCount = function() {
        return this.fetchPosts().length;
    };

    this.getCommentCount = function() {
        var posts = this.fetchPosts();
        var count = 0;
        for (var i = 0, n = posts.length; i < n; ++i) {
            count += posts[i].comments.length;
        }
        return count;
    };
}

module.exports = new LocalPostService();
