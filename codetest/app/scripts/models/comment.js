/*global Ontraport, Backbone*/

Ontraport.Models = Ontraport.Models || {};

(function () {
    'use strict';

    Ontraport.Models.Comment = Backbone.Model.extend({
        parse: function(rawPost, options){
            return _.extend(rawPost, {
                author: options.users.get(rawPost.userId)
            });
        }
    });
})();
