// Vendor
var http = require('chickendinosaur-http');

function PostsService() {
    this.fetchAllPosts = function() {
        return http.get('_data/posts.json');
    };

    this.addPost = function(post) {
        throw new Error('Not implemented.');
    };

    this.removePost = function(postId) {
        throw new Error('Not implemented.');
    };

    this.addComment = function(postId, comment) {
        throw new Error('Not implemented.');
    };
}

module.exports = new PostsService();
