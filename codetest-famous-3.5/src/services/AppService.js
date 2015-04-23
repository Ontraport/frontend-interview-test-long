'use strict'

var UserService = require('./UserService'),
    UserModel = require('./../models/UserModel');

function AppService() {
    this._loggedIn = false;
    this._online = false;

    this.login = function(userId) {
        var _this = this;

        // Substitute for logging in.
        UserService.fetchUserById(userId).then(function(user) {
            var user = new UserModel(user.id, {
                username: user.username,
                pic: user.pic,
                about: user.about
            });

            localStorage.setItem('user', JSON.stringify(user));

            _this._loggedIn = true;
        });
    };

    this.isLoggedIn = function() {
        return this._loggedIn;
    };

    this.isOnline = function() {
        return this._online;
    };
}

module.exports = new AppService();
