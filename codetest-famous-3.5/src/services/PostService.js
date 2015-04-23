'use strict'

var http = require('chickendinosaur-http');

function PostService() {
    this.fetchPosts = function() {
        return http.get('_data/posts.json');
    };

    this.addPost = function(postModel) {
        throw new Error('Not implemented.');
        console.log('addPost');
    };

    this.deletePost = function(postId) {
        throw new Error('Not implemented.');
    };

    this.addComment = function(postId, comment) {
        throw new Error('Not implemented.');
    };

    this.getPostCount = function() {
        return http.get('_data/posts.json').then(function(posts) {
            return posts.length;
        });
    };

    this.getCommentCount = function() {
        return http.get('_data/posts.json').then(function(posts) {
            var count = 0;
            for (var i = 0, n = posts.length; i < n; ++i) {
                count += posts[i].comments.length;
            }
            return count;
        });
    };
}

module.exports = new PostService();
