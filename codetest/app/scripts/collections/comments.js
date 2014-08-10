/*global Ontraport, Backbone*/

Ontraport.Collections = Ontraport.Collections || {};

(function () {
    'use strict';

    Ontraport.Collections.Comments = Backbone.Collection.extend({
        model: Ontraport.Models.Comment
    });
})();
