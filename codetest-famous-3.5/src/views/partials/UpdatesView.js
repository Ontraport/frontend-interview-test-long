'use strict'

var View = require('famous/core/View');
var StateModifier = require('famous/modifiers/StateModifier');
var RenderNode = require('famous/core/RenderNode');
var Surface = require('famous/core/Surface');

function UpdatesView() {
    View.call(this);

    /**
     * Self mod
     */

    var selfMod = new StateModifier({});

    this._selfRenderNode = new RenderNode()
    this._selfRenderNode.add(selfMod).add(this);

    /**
     * Background
     */

    var bg = new Surface({
        size: [535, true],
        content: 'Updates',
        classes: ['container']
    });

    /**
     * Add to view
     */
    
    this.add(bg);
}

UpdatesView.prototype = Object.create(View.prototype);
UpdatesView.constructor = UpdatesView;

UpdatesView.prototype.setModel = function(model) {
    this._updateContent();
};

UpdatesView.prototype._updateContent = function() {
};

module.exports = new UpdatesView();
