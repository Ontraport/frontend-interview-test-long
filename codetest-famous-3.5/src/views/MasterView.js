'use strict'

var View = require('famous/core/View');
var RenderNode = require('famous/core/RenderNode');
var Modifier = require('famous/core/Modifier');
var ViewSequence = require('famous/core/ViewSequence');
var StateModifier = require('famous/modifiers/StateModifier');
var Transform = require('famous/core/Transform');
var Surface = require('famous/core/Surface');
var FlexScrollView = require('famous-flex/FlexScrollView');
var ListLayout = require('famous-flex/layouts/ListLayout');
var Engine = require('famous/core/Engine');
var Easing = require('famous/transitions/Easing');
var FlexibleLayout = require('famous/views/FlexibleLayout');

var HeaderView = require('./HeaderView');
var ProfileView = require('./ProfileView');

function MasterView() {
    View.call(this);

    var _this = this;

    /**
     * Footer
     */

    this._footer = new Surface({
        size: [undefined, true],
        content: 'This is a footer message',
        classes: ['center-inner']
    });

    // this._footer.mod = new Modifier({});

    // this._footer.renderNode = new RenderNode();
    // this._footer.renderNode.add(this._footer.mod).add(this._footer);

    /**
     * Layout
     */

    //In animation

    this._contentTransitionInMod = new Modifier({
        size: [800, window.innerHeight - 115]
    });

    this._contentTransitionInMod.setTransform(Transform.translate(0, window.innerHeight, 0));
    this._contentTransitionInMod.setTransform(Transform.translate(0, 75, 0), {
        duration: 2000,
        curve: Easing.outBounce
    });

    this._centerContentNode = new Modifier({
        origin: [0.5, 0],
        align: [0.5, 0]
    });

    /**
     * Add to view
     */

    this.add(HeaderView.getRenderNode());
    this.add(this._centerContentNode).add(this._contentTransitionInMod).add(new ProfileView());
}

MasterView.prototype = Object.create(View.prototype);
MasterView.constructor = MasterView;

module.exports = MasterView;
