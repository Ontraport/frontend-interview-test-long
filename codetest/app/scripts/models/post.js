/*global Ontraport, Backbone*/

Ontraport.Models = Ontraport.Models || {};

(function () {
    'use strict';

    Ontraport.Models.Post = Backbone.Model.extend({
        parse: function (rawPost, options) {

            return _.extend(rawPost, {
                comments: new Ontraport.Collections.Comments(rawPost.comments, {users: options.users, parse: true}),
                author: options.users.get(rawPost.userId)

            });
        }
    });
})();
