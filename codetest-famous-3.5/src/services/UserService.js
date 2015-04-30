'use strict'

var http = require('chickendinosaur-http');

function UserService() {
    this.fetchUserById = function(id) {
        // return a promise with user data
        return http.get('assets/data/users.json').then(function(data) {
            var result;
            for (var i = 0, n = data.length; i < n; ++i) {
                var user = data[i];
                if (user.id === id) {
                    result = user;
                    break;
                }
            }
            return result = result || {};
        });
    };
    this.fetchUsers = function() {
        // return a promise with user data
        return http.get('assets/data/users.json');
    };
}

module.exports = new UserService();
