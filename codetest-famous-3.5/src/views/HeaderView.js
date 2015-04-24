'use strict'

// Vendor
var View = require('famous/core/View'),
    Modifier = require('famous/core/Modifier'),
    Surface = require('famous/core/Surface'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    RenderNode = require('famous/core/RenderNode'),
    Transform = require('famous/core/Transform'),
    Easing = require('famous/transitions/Easing'),
    FlexScrollView = require('famous-flex/FlexScrollView'),
    LayoutController = require('famous-flex/LayoutController'),
    SizeConstraint = require('famous-sizeconstraint/SizeConstraint'),
    NavBarLayout = require('famous-flex/layouts/NavBarLayout'),
    CollectionLayout = require('famous-flex/layouts/CollectionLayout'),
    // Local
    MenuBarView = require('./partials/MenuBarView'),
    SearchForm = require('./partials/SearchForm');

function HeaderView(model) {
    View.call(this);

    var _this = this;

    /**
     * Self mod
     */

    this._selfMod = new Modifier({
        size: [undefined, 60]
    });

    this._selfRenderNode = new RenderNode();
    this._selfRenderNode.add(this._selfMod).add(this);

    // In animation
    this._selfMod.setTransform(Transform.translate(0, -this._selfMod.getSize()[1], 2));
    this._selfMod.setTransform(Transform.translate(0, 0, 2), {
        duration: 2000,
        curve: Easing.outBounce
    });

    /**
     * Background
     */

    var bg = new Surface({
        size: [undefined, undefined],
        attributes: {
            id: 'header-bg'
        }
    });

    var bgMod = new StateModifier({
        transform: Transform.behind
    });

    var bgRenderNode = new RenderNode();
    bgRenderNode.add(bgMod).add(bg);

    /**
     * Logo
     */

    var logo = new ImageSurface({
        size: [225, 40],
        content: 'assets/images/logo.png',
        properties: {
            zIndex: '101'
        }
    });

    /**
     * Layout
     */

    this._layout = new LayoutController({
        layout: NavBarLayout,
        layoutOptions: {
            margins: [10, 5,0,5]
        },
        dataSource: {
            background: new Surface({
                    size: [undefined, undefined],
                    attributes: {
                        id: 'header-bg'
                    }
                }),
                title: SearchForm.getRenderNode(),
                rightItems: [MenuBarView.getRenderNode()],
                leftItems: [logo]
        }
    });

    /**
     * Add to view
     */

    // this.add(bgRenderNode);
    this.add(this._layout);
}

HeaderView.prototype = Object.create(View.prototype);
HeaderView.constructor = HeaderView;

HeaderView.prototype.getRenderNode = function() {
    return this._selfRenderNode;
};

module.exports = new HeaderView();
