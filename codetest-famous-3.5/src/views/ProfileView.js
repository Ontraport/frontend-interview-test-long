'use strict'

var View = require('famous/core/View'),
    Surface = require('famous/core/Surface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    // Local
    AppService = require('./../services/AppService'),
    UserInfoView = require('./partials/UserInfoView'),
    UpdatesView = require('./partials/UpdatesView');


function ProfileView() {
    View.call(this);

    var _this = this;

    this._content = document.createElement('div');
    this._content.className = 'profile-content block';

    // bandaid to separate footer from middle content.
    this._wrapper = document.createElement('div');
    this._wrapper.appendChild(this._content);
    this._wrapper.className = 'profile block';

    // add user info view
    this._content.appendChild(new UserInfoView(AppService.getUser()).getContent());

    // add updates view
    this._content.appendChild(UpdatesView.getContent());

    // add footer
    this._pageFooter = document.createElement('div');
    this._pageFooter.className = 'block center-inner footer';
    this._pageFooter.innerHTML = 'This is a footer message';

    this._wrapper.appendChild(this._pageFooter);

    // content surface to position within the famous context
    this._contentSurface = new Surface({
        size: [undefined, undefined],
        content: this._wrapper
    });

    this.add(this._contentSurface);
}

ProfileView.prototype = Object.create(View.prototype);
ProfileView.constructor = ProfileView;

module.exports = new ProfileView();
