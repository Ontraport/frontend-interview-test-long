var http = require('chickendinosaur-http');

function UserService() {
    this._user = {};
}

UserService.prototype.getUser = function() {
    return this._user;
};

UserService.prototype.login = function() {
	var _this = this;
    // attempt login

    // sets logged in user info and returns true or false.
    // in a real app i'd extend an event handler as well to pipe info
    return this.getUserById(5).then(function(data) {
        _this._user = data;
        return true;
    });
};

UserService.prototype.getUserById = function(id) {
    // return a promise with user data
    return http.get('_data/users.json').then(function(data) {
        var result;
        for (var i = 0, n = data.length; i < n; ++i) {
            var user = data[i];
            if (user.id === id) {
                result = user;
                break;
            }
        }
        return result;
    });
};

module.exports = new UserService();