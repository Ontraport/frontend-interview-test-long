'use strict'

var EventHandler = require('famous/core/EventHandler');

function UserInfoView(userModel) {
    EventHandler.call(this);

    this._model = {
        pic: '',
        username: ''
    };

    this._content = document.createElement('div');
    this._content.className = 'inline-block user-info container';

    this.setModel(userModel);
}

UserInfoView.prototype = Object.create(EventHandler.prototype);
UserInfoView.constructor = UserInfoView;

UserInfoView.prototype.setModel = function(model) {
    this._model.pic = 'assets/' + model.pic;
    this._model.username = model.username;

    this._render();
};

UserInfoView.prototype._render = function() {
    this._content.innerHTML = [
        '<img class="user-icon-normal" src=',
        this._model.pic,
        ' />',
        this._model.username
    ].join('');
};

UserInfoView.prototype.getContent = function() {
    return this._content;
};

module.exports = UserInfoView;
