// Vendor
var http = require('chickendinosaur-http');

function PostsService() {
    this.fetchAllPosts = function() {
        return http.get('_data/posts.json');
    };
}

module.exports = new PostsService();
