'use strict'

var View = require('famous/core/View'),
    Surface = require('famous/core/Surface');

function UserInfoView(userModel) {
    View.call(this);

    this._model = {
        pic: '',
        username: ''
    };

    this._userInfo = new Surface({
        size: [250, true],
        content: '',
        classes: ['container']
    });

    /**
     * Add to view
     */

    this.add(this._userInfo);

    this.setModel(userModel);
}

UserInfoView.prototype = Object.create(View.prototype);
UserInfoView.constructor = UserInfoView;

UserInfoView.prototype.setModel = function(model) {
    this._model.pic = 'assets/' + model.pic;
    this._model.username = model.username;

    this._updateContent();
};

UserInfoView.prototype._updateContent = function() {
    this._userInfo.setContent([
        '<img class="user-icon-normal" src=',
        this._model.pic,
        ' />',
        this._model.username
    ].join(''));
};

module.exports = UserInfoView;
