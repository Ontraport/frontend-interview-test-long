'use strict'

var View = require('famous/core/View');
var StateModifier = require('famous/modifiers/StateModifier');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var Surface = require('famous/core/Surface');
var Easing = require('famous/transitions/Easing');
var ListLayout = require('famous-flex/layouts/ListLayout'),
    FlexScrollView = require('famous-flex/FlexScrollView'),
    LayoutController = require('famous-flex/LayoutController'),
    CollectionLayout = require('famous-flex/layouts/CollectionLayout'),
    // Local
    AppService = require('./../services/AppService'),
    UserInfoView = require('./partials/UserInfoView'),
    UpdatesView = require('./partials/UpdatesView');


function ProfileView() {
    View.call(this);

    var _this = this;

    /**
     * Add UserInfoView
     */

    this.add(new UserInfoView(JSON.parse(localStorage.getItem('user'))));

    /**
     * Add UpdatesView
     */

    this.add(new StateModifier({
            origin: [1, 0],
            align: [1, 0]
        }))
        .add(
            new Modifier({
                size: [535, window.innerHeight-115]
            }))
        .add(new UpdatesView());

    /**
     * Footer
     */

    this.add(new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 1],
            transform: Transform.translate(0,15,0)
        }))
        .add(new Surface({
            size: [400, true],
            content: 'This is a footer message',
            classes: ['center-inner']
        }));
}

ProfileView.prototype = Object.create(View.prototype);
ProfileView.constructor = ProfileView;

module.exports = ProfileView;
