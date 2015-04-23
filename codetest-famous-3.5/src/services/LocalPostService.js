'use strict'

var
//Local
    CommentModel = require('./../models/CommentModel'),
    PostModel = require('./../models/PostModel'),
    PostService = require('./PostService');

function LocalPostService() {
    this._savePosts = function(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
        console.log(localStorage.getItem('posts'));
    };

    this.fetchPosts = function() {
        var posts = localStorage.getItem('posts');
        return posts ? JSON.parse(posts) : [];
    };

    this.addPost = function(postModel) {
        var _this = this;

        if (postModel instanceof PostModel) {
            PostService.getPostCount().then(function(count) {
                var localCount = _this.getPostCount();
                postModel.id = localCount + count + 1;

                var posts = _this.fetchPosts();
                posts.push(postModel);
                _this._savePosts(posts);
            });
        }

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
            for (var i = 0, n = posts.length; i < n; ++i) {
                if (posts[i].id === commentModel.postId) {
                    // Save the comment.
                    PostService.getCommentCount().then(function(count) {
                        commentModel.id = _this.getCommentCount() + count + 1;
                        posts[i].comments.push(commentModel);
                        _this._savePosts(posts);
                    });
                    break;
                }
            }
        }
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
