var http = require('chickendinosaur-http');

function UserService() {
    this.fetchUserById = function(id) {
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
}

module.exports = new UserService();
