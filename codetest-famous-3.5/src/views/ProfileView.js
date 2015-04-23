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
     * Inject models
     */
    
    UserInfoView.setModel(JSON.parse(localStorage.getItem('user')));

    /**
     * Layout
     */
    
    this._updatesViewNode = new StateModifier({
        origin: [1, 0],
        align: [1, 0]
    });

    /**
     * Add to view
     */

    this.add(UserInfoView);
    this.add(this._updatesViewNode).add(UpdatesView);
}

ProfileView.prototype = Object.create(View.prototype);
ProfileView.constructor = ProfileView;

module.exports = new ProfileView();
