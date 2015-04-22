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
    //var userService = require('./services/UserService');
    //var profileService = require('./services/ProfileService');
    Engine.on('keydown', function(e) {
    });
});
