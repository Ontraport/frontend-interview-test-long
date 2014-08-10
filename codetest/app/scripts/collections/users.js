/*global Ontraport, Backbone*/

Ontraport.Collections = Ontraport.Collections || {};

(function () {
    'use strict';

    Ontraport.Collections.Users = Backbone.Collection.extend({
        model: Ontraport.Models.User,
        url: './data/users.json'
    });
})();
