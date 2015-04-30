'use strict'

var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var StateModifier = require('famous/modifiers/StateModifier');
var Transform = require('famous/core/Transform');
var Easing = require('famous/transitions/Easing');
var MasterController = require('./../controllers//MasterController');

var HeaderView = require('./HeaderView');
var ProfileView = require('./ProfileView');

function MasterView() {
    View.call(this);

    var _this = this;

    /**
     * Layout
     */

    //In animation

    this._contentTransitionInMod = new StateModifier({
    });

    this._contentTransitionInMod.setTransform(Transform.translate(0, window.innerHeight, 0));
    this._contentTransitionInMod.setTransform(Transform.translate(0, 75, 0), {
        duration: 2000,
        curve: Easing.outBounce
    });

    /**
     * Add to view
     */

    this.add(HeaderView.getRenderNode());
    this.add(this._contentTransitionInMod).add(ProfileView);
    // ghetto bandaid background color for the body
    this.add(new Surface({
        size: [undefined, undefined],
        properties:{
            backgroundColor: 'rgb(167, 199, 220)'
        },
        classes:['behind']
    }));
}

MasterView.prototype = Object.create(View.prototype);
MasterView.constructor = MasterView;

module.exports = MasterView;
