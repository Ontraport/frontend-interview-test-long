'use strict'

var View = require('famous/core/View'),
    StateModifier = require('famous/modifiers/StateModifier'),
    RenderNode = require('famous/core/RenderNode'),
    Transform = require('famous/core/Transform'),
    Easing = require('famous/transitions/Easing'),
    Surface = require('famous/core/Surface');

function SearchForm() {
    View.call(this);

    var _this = this;

    /**
     * Self mod
     */

    this._selfMod = new StateModifier({
        size: [287, 25],
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    this._marginLeftNode = new StateModifier({
        transform: Transform.translate(50, 0, 0)
    });

    this._selfRenderNode = new RenderNode();
    this._selfRenderNode.add(this._selfMod).add(this._marginLeftNode).add(this);

    /**
     * Go button
     */

    var goButtonEl = document.createElement('input');
    goButtonEl.setAttribute('type', 'button');
    goButtonEl.className = 'search-form';
    goButtonEl.value = 'Go';

    var goButton = new Surface({
        size: [true, true],
        content: goButtonEl
    });

    var goButtonMod = new StateModifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        transform: Transform.inFront
    });

    var goButtonRenderNode = new RenderNode();
    goButtonRenderNode.add(goButtonMod).add(goButton);

    goButton.on('mouseover', function(e) {
        goButtonMod.halt();
        goButtonMod.setTransform(Transform.rotate(0, 0, -0.32), {
                duration: 100,
                curve: Easing.outCirc
            },
            function() {
                goButtonMod.setTransform(Transform.rotate(0, 0, 0), {
                    method: 'spring',
                    dampingRatio: 0.0,
                    period: 400
                });
            }); //
    });
    goButton.on('mouseout', function(e) {
        goButtonMod.halt();
        goButtonMod.setTransform(Transform.rotate(0, 0, 0), {
            method: 'spring',
            dampingRatio: 0.08,
            period: 200
        });
    });

    // Button position view

    var goButtonViewMod = new StateModifier({
        size: [32, 25],
        origin: [1, 0],
        align: [1, 0]
    });
    var goButtonView = new View();
    goButtonView.add(goButtonRenderNode);

    var goButtonViewRenderNode = new RenderNode();
    goButtonViewRenderNode.add(goButtonViewMod).add(goButtonView);

    /**
     * Search box
     */

    var searchEl = document.createElement('input');
    searchEl.setAttribute('type', 'text');
    searchEl.className = 'search-form';

    var searchTextField = new Surface({
        size: [true, true],
        content: searchEl,
        properties: {
            backgroundColor: 'blue'
        }
    });

    /**
     * Events
     */

    goButtonEl.addEventListener('click', function() {
        _this._eventOutput.emit('submit', {
            query: searchEl.value
        });
    });

    /**
     * Add to view
     */

    this.add(searchTextField);
    this.add(goButtonViewRenderNode);
}

SearchForm.prototype = Object.create(View.prototype);
SearchForm.constructor = SearchForm;

SearchForm.prototype.getRenderNode = function() {
    return this._selfRenderNode;
};

module.exports = new SearchForm();
