/*global Ontraport, Backbone*/

Ontraport.Views = Ontraport.Views || {};

(function () {
    'use strict';

    Ontraport.Views.Userview = Backbone.View.extend({

        template: _.template($('#userTemplate').html()),

        el: '#userview',
        initialize: function () {
            var self = this;
            this.users = new Ontraport.Collections.Users();
            this.users.fetch().done(function () {
                self.render();
            });
        },
        render: function () {
            var user = this.users.at(4);
            this.$el.html(this.template({user : user}));
            this.header = new Ontraport.Views.Headerview({model : user});
            this.header.render();
            return this;
        }
    });
})();
