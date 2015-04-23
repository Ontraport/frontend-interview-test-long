'use strict'

document.addEventListener('DOMContentLoaded', function(e) {
    // Vendor 
    require('famous-polyfills');
    var Engine = require('famous/core/Engine'),
        Transitionable = require('famous/transitions/Transitionable'),
        SpringTransition = require('famous/transitions/SpringTransition');

    Transitionable.registerMethod('spring', SpringTransition);

    Engine.setOptions({
        appMode: false
    });

    var mainContext = Engine.createContext();
    mainContext.setPerspective(-1900);
    var MasterView = require('./views/MasterView.js');
    mainContext.add(MasterView.getRenderNode());

    /**
     * Test shit
     */

    // Test services.
    var AppService = require('./services/AppService');
    var UserService = require('./services/UserService');
    var PostService = require('./services/PostService');
    var LocalPostService = require('./services/LocalPostService');
    var PostModel = require('./models/PostModel');
    var CommentModel = require('./models/CommentModel');

    localStorage.clear();
    AppService.login(9);
    Engine.on('keydown', function(e) {
        // alt+o
        if (e.keyCode === 79 &&
            e.altKey) {
            AppService._online = !AppService._online;
            console.log('Is online: ' + AppService.isOnline());
        }
        // l
        if (e.keyCode === 76) {
            LocalPostService.addPost(new PostModel(5, "content"))
        }
        // k
        if (e.keyCode === 75) {
            LocalPostService.deletePost(8);
            LocalPostService.addComment(new CommentModel(5, 7, "comment content"));
        }
    });
});
