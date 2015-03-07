'use strict';
//implement 3-way data binding using Firebase API
app.factory('Post', function($firebase, FIREBASE_URL) {
    var hashKey = new Firebase(FIREBASE_URL); //create a new Firebaaser reference 
    //create a pointer to our posts
    //return $resource('https://ontra-network.firebaseio.com/posts/:id.json')
    var posts = $firebase(hashKey.child('posts')).$asArray();
    var comments = $firebase(hashKey.child('comments')).$asArray();
    var Post = {
        all: posts,
        allComments: comments,
        create: function(post) {
            return posts.$add(post);
        },
        get: function(postId) {
            return $firebase(hashKey.child('posts').child(postId)).$asObject();
        },
        delete: function(post) {
            return posts.$remove(post);
        },
        comments: function(postId) {
            return $firebase(hashKey.child('comments').child(postId)).$asArray();
        }

    };

    return Post;
});
