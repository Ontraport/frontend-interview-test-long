'use strict'

var View = require('famous/core/View'),
    StateModifier = require('famous/modifiers/StateModifier'),
    RenderNode = require('famous/core/RenderNode'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    Surface = require('famous/core/Surface'),
    Transform = require('famous/core/Transform');

function NavBarView() {
    View.call(this);

    var _this = this;

    /**
     * Self mod.
     */

    var selfMod = new StateModifier({
        size: [220, 25],
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    this._selfRenderNode = new RenderNode();
    this._selfRenderNode.add(selfMod).add(this);

    // Model

    this._model = {
        pic: ''
    }

    /**
     * Buttons
     */

    // home
    var menuBarButtonsEl = document.createElement('div');

    var homeButtonEl = document.createElement('input');
    homeButtonEl.setAttribute('type', 'button');
    homeButtonEl.className = 'menu-bar';
    homeButtonEl.value = 'Home';

    var postUpdateEl = document.createElement('input');
    postUpdateEl.setAttribute('type', 'button');
    postUpdateEl.className = 'menu-bar';
    postUpdateEl.value = 'Post an update';

    menuBarButtonsEl.appendChild(homeButtonEl);
    menuBarButtonsEl.appendChild(postUpdateEl);

    var menuBarButtons = new Surface({
        size: [175, true],
        content: menuBarButtonsEl
    });

    menuBarButtons.mod = new StateModifier({
        origin: [0, 0.5],
        align: [0, 0.5]
    });

    menuBarButtons.renderNode = new RenderNode();
    menuBarButtons.renderNode.add(menuBarButtons.mod).add(menuBarButtons);

    /**
     * User icon
     */

    this._userIcon = new ImageSurface({
        size: [25, 25],
        content: this._model.profilePic
    });

    // set model here for now.
    this.setModel(JSON.parse(localStorage.getItem('user')));

    this._userIcon.mod = new StateModifier({
        origin: [1, 0],
        align: [1, 0],
        transform:Transform.translate(-15,0,0)
    });

    this._userIcon.renderNode = new RenderNode();
    this._userIcon.renderNode.add(this._userIcon.mod).add(this._userIcon);

    /**
     * Events
     */

    homeButtonEl.addEventListener('click', function() {
        _this._eventOutput.emit('home');
    });
    postUpdateEl.addEventListener('click', function() {
        _this._eventOutput.emit('profile.postUpdate');
    });

    // Add to view

    this.add(menuBarButtons.renderNode);
    this.add(this._userIcon.renderNode);
}

NavBarView.prototype = Object.create(View.prototype);
NavBarView.constructor = NavBarView;

NavBarView.prototype.getRenderNode = function() {
    return this._selfRenderNode;
};

NavBarView.prototype.setModel = function(model) {
    this._model.pic = 'assets/' + model.pic;

    this._updateContent();
};

NavBarView.prototype._updateContent = function() {
    this._userIcon.setContent(this._model.pic);
};


module.exports = new NavBarView();
