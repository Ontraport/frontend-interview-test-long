/*global Ontraport, Backbone*/

Ontraport.Collections = Ontraport.Collections || {};

(function () {
    'use strict';

    Ontraport.Collections.Posts = Backbone.Collection.extend({

        model: Ontraport.Models.Post,
        url: './data/posts.json'
    });
})();
