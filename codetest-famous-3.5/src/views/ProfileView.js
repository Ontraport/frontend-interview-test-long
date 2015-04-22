'use strict'

var View = require('famous/core/View');
var Modifier = require('famous/core/Modifier');
var StateModifier = require('famous/modifiers/StateModifier');
var RenderNode = require('famous/core/RenderNode');
var FlexibleLayout = require('famous/views/FlexibleLayout');
var Transform = require('famous/core/Transform');
var Surface = require('famous/core/Surface');
var Engine = require('famous/core/Engine');
var Easing = require('famous/transitions/Easing');
var ListLayout = require('famous-flex/layouts/ListLayout'),
    FlexScrollView = require('famous-flex/FlexScrollView'),
    LayoutController = require('famous-flex/LayoutController'),
    CollectionLayout = require('famous-flex/layouts/CollectionLayout');

function ProfileView() {
    View.call(this);

    var _this = this;

    /**
     * Self mod
     */

    this._selfMod = new Modifier({
    });

    this._selfRenderNode = new RenderNode();
    this._selfRenderNode.add(this._selfMod).add(this);

    /**
     * User info
     */

    this._userInfo = new Surface({
        size: [250, 55],
        content: [
            '<img class="user-icon-normal" src="assets/images/profile/daniel-craig.jpg"/>',
            'TODO: feed user model'
        ].join(''),
        classes: ['container']
    })

    this._userInfoMod = new StateModifier({
        origin: [0, 0],
        align: [0, 0]
    });

    this._userInfoRenderNode = new RenderNode();
    this._userInfoRenderNode.add(this._userInfoMod).add(this._userInfo);

    /**
     * Layout
     */

    /**
     * Add to view
     */

    this.add(this._userInfo);
}

ProfileView.prototype = Object.create(View.prototype);
ProfileView.constructor = ProfileView;

ProfileView.prototype.getRenderNode = function() {
    return this._selfRenderNode;
};

module.exports = new ProfileView();
