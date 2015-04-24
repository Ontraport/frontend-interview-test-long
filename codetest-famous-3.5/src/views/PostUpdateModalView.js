'use strict'

var View = require('famous/core/View'),
    Surface = require('famous/core/Surface'),
    RenderNode = require('famous/core/RenderNode'),
    Easing = require('famous/transitions/Easing'),
    Transform = require('famous/core/Transform'),
    TextAreaSurface = require('famous/surfaces/TextAreaSurface'),
    ListLayout = require('famous-flex/layouts/ListLayout'),
    FlexScrollView = require('famous-flex/FlexScrollView'),
    StateModifier = require('famous/modifiers/StateModifier');

function PostUpdateModalView() {
    View.call(this);

    var _this = this;

    this._opened = false;

    /**
     * Modal
     */

    this._textArea = new TextAreaSurface({
        size: [undefined, 150]
    });

    var footer = new RenderNode();

    footer.add(new StateModifier({})).add(new Surface({
        size: [undefined, true],
        content: 'Press "Ctrl + Enter" to close.'
    }));

    var modal = new FlexScrollView({
        layout: ListLayout,
        layoutOptions: {
            margins: [3, 3, 3, 3],
            spacing: 5
        },
        useContainer: true,
        container: {
            classes: ['container'],
            properties: {
                color: 'grey',
                backgroundColor: 'white',
                textAlign: 'center'
            }
        },
        dataSource: [
            this._textArea,
            footer
        ]
    });

    /**
     * Position node
     */

    this._positionMod = new StateModifier({
        origin: [0.5, 0],
        align: [0.5, 0]
    });

    /**
     * Animation node
     */

    this._animationMod = new StateModifier({
        size: [400, 180],
        transform: Transform.translate(0, -400, 1)
    });

    /**
     * Add to container
     */

    this.add(this._positionMod)
        .add(this._animationMod)
        .add(modal);

    /**
     * Events
     */

    window.addEventListener('keydown', function(e) {
        if (_this._opened === true) {
            // Ctrl + Enter
            if (e.which === 13 &&
                e.ctrlKey === true) {
                _this.close();
                _this._eventOutput.emit('close', {
                    text: _this._textArea.getValue()
                });
                _this.clear();
            }
        }
    });
}

PostUpdateModalView.prototype = Object.create(View.prototype);
PostUpdateModalView.constructor = PostUpdateModalView;

PostUpdateModalView.prototype.open = function() {
    if (this._opened === false) {
        this._animationMod.setTransform(Transform.translate(0, window.innerHeight/7.5, 1), {
            duration: 1000,
            curve: Easing.outBounce
        });
        this._opened = true;
    }
};

PostUpdateModalView.prototype.close = function() {
    var _this = this;
    this._animationMod.setTransform(Transform.translate(window.innerWidth + this._animationMod.getSize()[0] / 2, window.innerHeight/7.5, 1), {
        duration: 750,
        curve: Easing.outCirc
    }, function() {
        _this._animationMod.setTransform(Transform.translate(0, -_this._animationMod.getSize()[1], 1));
    });
    this._opened = false;
};

PostUpdateModalView.prototype.clear = function() {
    this._textArea._currentTarget.value='';
};

module.exports = new PostUpdateModalView();
