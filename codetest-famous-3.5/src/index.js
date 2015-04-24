'use strict'

document.addEventListener('DOMContentLoaded', function(e) {
    // Vendor 
    require('famous-polyfills');
    var Engine = require('famous/core/Engine'),
        Transitionable = require('famous/transitions/Transitionable'),
        SpringTransition = require('famous/transitions/SpringTransition');
    var AppService = require('./services/AppService');
    var MasterView = require('./views/MasterView.js');
    var PostUpdateModalView = require('./views/PostUpdateModalView');

    Transitionable.registerMethod('spring', SpringTransition);

    Engine.setOptions({
        appMode: true
    });

    var mainContext = Engine.createContext();
    mainContext.setPerspective(1900);

    /**
     * Add to context
     */

    mainContext.add(new MasterView());
    mainContext.add(PostUpdateModalView);

    /**
     * Login
     */
    
    AppService.login(4);

    //localStorage.clear();

    /**
     * Test shit
     */

    // Test services.
    // var UserService = require('./services/UserService');
    // var PostService = require('./services/PostService');
    // var LocalPostService = require('./services/LocalPostService');
    // var PostModel = require('./models/PostModel');
    // var CommentModel = require('./models/CommentModel');

    // Engine.on('keydown', function(e) {
    //     // alt+o
    //     if (e.keyCode === 79 &&
    //         e.altKey) {
    //         AppService._online = !AppService._online;
    //         console.log('Is online: ' + AppService.isOnline());
    //     }
    //     // l
    //     if (e.keyCode === 76) {
    //         LocalPostService.addPost(new PostModel(5, "content"))
    //     }
    //     // k
    //     if (e.keyCode === 75) {
    //         LocalPostService.deletePost(8);
    //         LocalPostService.addComment(new CommentModel(5, 7, "comment content"));
    //     }
    // });
});
