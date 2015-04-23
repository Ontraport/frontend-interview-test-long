'use strict'

document.addEventListener('DOMContentLoaded', function(e) {
    require('famous-polyfills');

    var Engine = require('famous/core/Engine');
    var Transitionable = require('famous/transitions/Transitionable');
    var SpringTransition = require('famous/transitions/SpringTransition');

    Engine.setOptions({
        appMode: false
    });

    var mainContext = Engine.createContext();
    mainContext.setPerspective(-1900);

    Transitionable.registerMethod('spring', SpringTransition);

    var MasterView = require('./views/MasterView.js');

    mainContext.add(MasterView.getRenderNode());

    // test read from local disk
    var userService = require('./services/UsersService');
    var postService = require('./services/PostsService');
    Engine.on('keydown', function(e) {
        // postService.addPost({
        //     test: 'yay'
        // }).then(function(data) {
        //     console.log(data);
        // });

        postService.fetchAllPosts().then(function(data) {
            console.log(data);
        });
    });
});
