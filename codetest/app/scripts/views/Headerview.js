/*global Ontraport, Backbone*/

Ontraport.Views = Ontraport.Views || {};

(function () {
    'use strict';

    Ontraport.Views.Headerview = Backbone.View.extend({

        template: _.template($('#headerTemplate').html()),
        el: '#headerView',
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})();
