'use strict'

var View = require('famous/core/View');
var ViewSequence = require('famous/core/ViewSequence');
var StateModifier = require('famous/modifiers/StateModifier');
var RenderNode = require('famous/core/RenderNode');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var Easing = require('famous/transitions/Easing');
var ListLayout = require('famous-flex/layouts/ListLayout'),
    FlexScrollView = require('famous-flex/FlexScrollView');

function UpdatesView() {
    View.call(this);

    /**
     * Add posts list
     */

    var postsList = new FlexScrollView({
        layout: ListLayout,
        layoutOptions: {
            //itemSize: [true, true],
            margins: [0, 3, 0, 3],
            spacing: 0
        },
        //enabled:false,
        useContainer: true,
        container: {
            properties: {
                overflow: 'hidden'
            },
            classes: ['container']
        },
        autoPipeEvents: true,
        mouseMove: true,
        flow: true,
        flowOptions: {
            spring: { // spring-options used when transitioning between states
                dampingRatio: 0.1, // spring damping ratio
                period: 1200 // duration of the animation
            },
            insertSpec: { // render-spec used when inserting renderables
                opacity: 0, // start opacity is 0, causing a fade-in effect,
                //size: [0, 0], // uncommented to create a grow-effect
                transform: Transform.translate(0, 0, 0) // uncomment for slide-in effect
            },
            removeSpec: {} // render-spec used when removing renderables
        },
        direction: 1,
        dataSource: [
            new Surface({
                size: [undefined, 40],
                content: '<span class="updates-header">Updates</span>'
            })
        ]
    });

    this.add(postsList);

    var Engine = require('famous/core/Engine');
    Engine.on('keydown', function(e) {

        postsList.push(new Surface({
            size: [undefined, 400],
            content: 'One',
            classes: ['test-cell']
        }));
    });
}

UpdatesView.prototype = Object.create(View.prototype);
UpdatesView.constructor = UpdatesView;

UpdatesView.prototype.setModel = function(model) {
    this._updateContent();
};

UpdatesView.prototype._updateContent = function() {};

module.exports = UpdatesView;
