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
        content: 'Press \'Enter\' to save.'
    }));

    var modal = new FlexScrollView({
        layout: ListLayout,
        layoutOptions: {
            margins: [3, 3, 3, 3],
            spacing: 5
        },
        enabled: false,
        useContainer: true,
        container: {
            classes: ['container'],
            properties: {
                color: 'grey',
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
     *
     */

    this._textArea.on('keydown', function(e) {
        // Enter
        if (e.which === 13) {
            _this.save();
            _this.close();
            e.preventDefault();
        }
    });
}

PostUpdateModalView.prototype = Object.create(View.prototype);
PostUpdateModalView.constructor = PostUpdateModalView;

PostUpdateModalView.prototype.open = function() {
    var _this = this;
    if (this._opened === false) {
        this._textArea.focus();
        this._animationMod.setTransform(Transform.translate(0, window.innerHeight * 0.5 - this._animationMod.getSize()[1] / 2, 1), {
            duration: 1000,
            curve: Easing.outBounce
        });
        _this._opened = true;
    }
};

PostUpdateModalView.prototype.close = function() {
    var _this = this;
    if (this._opened === true) {
        var body = document.body,
            html = document.documentElement;

        var height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        this._animationMod.setTransform(Transform.translate(0, height, 1), {
            duration: 1000,
            curve: Easing.outBounce
        }, function() {
            _this._animationMod.setTransform(Transform.translate(0, -_this._animationMod.getSize()[1], 1));
            _this._opened = false;
        });
        _this._eventOutput.emit('close');
    }
};

PostUpdateModalView.prototype.save = function() {
    var _this = this;
    _this._eventOutput.emit('save', {
        text: _this._textArea.getValue()
    });
    _this.clear();
};


PostUpdateModalView.prototype.clear = function() {
    this._textArea._currentTarget.value = '';
};

module.exports = new PostUpdateModalView();
