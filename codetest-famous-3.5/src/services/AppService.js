'use strict'

var UserService = require('./UserService');

function AppService() {
    this._user = null;
    this._loggedIn = false;
    this._online = false;

    this.login = function(userId) {
        var _this = this;

        // // Substitute for logging in.
        return UserService.fetchUserById(userId).then(function(user) {
            // This is just to show local storage support.
            if (localStorage)
                localStorage.setItem('user', JSON.stringify(user));

            _this._loggedIn = true;

            _this._user = user;

            return user;
        });
    };

    this.isLoggedIn = function() {
        return this._loggedIn;
    };

    this.isOnline = function() {
        return this._online;
    };

    this.getUser = function() {
        var result;

        if (localStorage) {
            result = JSON.parse(localStorage.getItem('user'));
        } else {
            result = this._user;
        }

        return result;
    };
}

module.exports = new AppService();
