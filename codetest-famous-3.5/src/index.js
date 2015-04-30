'use strict'

document.addEventListener('DOMContentLoaded', function(e) {
    // Vendor 
    require('famous-polyfills');
    var Engine = require('famous/core/Engine'),
        Surface = require('famous/core/Surface'),
        Transitionable = require('famous/transitions/Transitionable'),
        SpringTransition = require('famous/transitions/SpringTransition'),
        LocalPostService = require('./services/LocalPostService'),
        AppService = require('./services/AppService'),
        MasterView = require('./views/MasterView.js'),
        PostUpdateModalView = require('./views/PostUpdateModalView');

    Transitionable.registerMethod('spring', SpringTransition);

    Engine.setOptions({
        appMode: false
    });

    var mainContext = Engine.createContext();

    mainContext.setPerspective(1900);

    Engine.nextTick(function() {
        mainContext.emit('resize', {});
    });

    // app mode off require setting background like this
    document.getElementsByTagName('html')[0].style.backgroundColor = 'rgb(190, 210, 235)';

    /**
     * Login
     */

    AppService.login(5).then(function(data) {
        /**
         * Add to context
         */

        mainContext.add(new MasterView());
        mainContext.add(PostUpdateModalView);
    });

    /**
     * Hotkeys
     */

    Engine.on('keydown', function(e) {
        // toggle the app being online or offline
        // alt+o
        if (e.keyCode === 79 &&
            e.altKey) {
            AppService._online = !AppService._online;
            console.log('Is online: ' + AppService.isOnline());
        }
        // clear local storage
        // alt+l
        if (e.keyCode === 76 &&
            e.altKey) {
            LocalPostService.clear();
            console.log('LocalPostService cleared.');
        }
    });
});
