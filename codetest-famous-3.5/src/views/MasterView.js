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
     * Self mod
     */

    this._selfMod = new Modifier({
        size: [undefined, undefined]
    });

    this._selfRenderNode = new RenderNode();
    this._selfRenderNode.add(this._selfMod).add(this);

    /**
     * Footer
     */

    this._footer = new Surface({
        size: [undefined, true],
        content: 'This is a footer message',
        classes: ['center-inner']
    });

    // this._footer.modAlign = new StateModifier({
    //     origin: [0.5, 0],
    //     align: [0.5, 0]
    // });

    this._footer.modPos = new Modifier({});

    this._footer.renderNode = new RenderNode();
    this._footer.renderNode.add(this._footer.modAlign).add(this._footer);

    /**
     * Layout
     */

    var layout = new FlexibleLayout({
        ratios: [true, true],
        direction: 1
    });
    
    layout.sequenceFrom([
        ProfileView.getRenderNode(),
        this._footer.renderNode
    ])

    var layoutMod = new Modifier({
        size: [undefined, undefined]
    });

    //In animation
    layoutMod.setTransform(Transform.translate(0, window.innerHeight, 0));
    layoutMod.setTransform(Transform.translate(0, 75, 0), {
        duration: 2000,
        curve: Easing.outBounce
    });

    /**
     * Add to view
     */

    this.add(HeaderView.getRenderNode());
    this.add(layoutMod).add(layout);
    this.add(new Surface({
        size:[undefined,undefined],
        properties:{
            backgroundColor:'rgb(167, 199, 220)',
            zIndex: '-100'
        }
    }))
}

MasterView.prototype = Object.create(View.prototype);
MasterView.constructor = MasterView;

MasterView.prototype.getRenderNode = function() {
    return this._selfRenderNode;
};

module.exports = new MasterView();
