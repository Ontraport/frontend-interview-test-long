'use strict'

var Http = require('chickendinosaur-http'),
    AppService = require('./AppService'),
    LocalPostService = require('./LocalPostService');

function PostService() {
    this.fetchPosts = function() {
        return Http.get('assets/data/posts.json').then(function(posts) {
            var allPosts = posts;
            var localPosts = LocalPostService.fetchPosts();
            var localComments = LocalPostService.fetchComments();

            // add localstorage comments
            for (var i = 0, n = allPosts.length; i < n; ++i) {
                for (var j = 0, nn = localComments.length; j < nn; ++j) {
                    if (allPosts[i].id === localComments[j].postId) {
                        allPosts[i].comments.push(localComments[j]);
                    }
                }
            }

            // concat localstorage posts
            for (i = 0, n = localPosts.length; i < n; ++i) {
                allPosts.push(localPosts[i]);
            }

            return allPosts;
        });
    };

    this.addPost = function(postModel) {
        var result;
        if (AppService.isOnline() === true)
            throw new Error('Not implemented.');
        else {
            result = this.getPostCount().then(function(count) {
                postModel.id = count;
                return LocalPostService.addPost(postModel);
            });
        }
        return result;
    };

    this.deletePost = function(postId) {
        if (AppService.isOnline() === true)
            throw new Error('Not implemented.');
        else {
            LocalPostService.deletePost(postId);
        }
    };

    this.addComment = function(commentModel) {
        var result;
        if (AppService.isOnline() === true)
            throw new Error('Not implemented.');
        else {
            result = this.getCommentCount().then(function(count) {
                commentModel.id = count;
                return LocalPostService.addComment(commentModel);
            });
        }
        return result;
    };

    this.getPostCount = function() {
        return Http.get('assets/data/posts.json').then(function(posts) {
            return posts.length;
        });
    };

    this.getCommentCount = function() {
        return Http.get('assets/data/posts.json').then(function(posts) {
            var count = 0;
            for (var i = 0, n = posts.length; i < n; ++i) {
                count += posts[i].comments.length;
            }
            return count;
        });
    };
}

module.exports = new PostService();
