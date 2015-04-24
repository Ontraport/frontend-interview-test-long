'use strict'

var UserService = require('./UserService'),
    UserModel = require('./../models/UserModel');

function AppService() {
    this._user = null;
    this._loggedIn = false;
    this._online = false;
    this._localStorageSupported = (localStorage !== undefined);

    this.login = function(userId) {
        var _this = this;

        // Substitute for logging in.
        UserService.fetchUserById(userId).then(function(user) {
            var user = new UserModel(user.id, {
                username: user.username,
                pic: user.pic,
                about: user.about
            });

            // This is just to show local storage support.
            if (_this._localStorageSupported) {
                localStorage.setItem('user', JSON.stringify(user));
                _this._user = user;
            } else
                _this._user = user;

            _this._loggedIn = true;
        });
    };

    this.isLoggedIn = function() {
        return this._loggedIn;
    };

    this.isOnline = function() {
        return this._online;
    };

    this.getUser = function() {
        if(this._loggedIn === false)
            this.login(4);
        
        return this._user;
    };
}

module.exports = new AppService();
