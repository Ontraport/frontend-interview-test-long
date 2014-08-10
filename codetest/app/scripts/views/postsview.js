/*global Ontraport, Backbone*/

Ontraport.Views = Ontraport.Views || {};

(function () {
    'use strict';

    Ontraport.Views.Postsview = Backbone.View.extend({
        el: '#header',
        initialize: function () {
            _.bindAll(this, 'render');
            this.collection = new Ontraport.Collections.Posts();
            this.users = new Ontraport.Collections.Users();
            var self = this;
            this.users.fetch().done(function () {
                self.collection.fetch({users: self.users});
            });
            this.collection.on("add", this.render, this);
            this.collection.on("change", this.postUpdate, this);
        },
        events: {
            'click .postUpdate': 'postUpdate'
        },
        postUpdate: function () {
            var newPost = new Ontraport.Models.Post({
                "id": this.guid()(),
                "userId": 4,
                "date": moment().calendar(),
                "content" : "This is a new post",
                "comments" : new Ontraport.Collections.Comments([]),
                "author":  new Ontraport.Models.User({
                    "id": '',
                    "username": "James Bond",
                    "pic": "images/profile/Sean-Connery-as-James-Bond.jpg"
                })
            });
            console.log(this.guid()());
            this.collection.add(newPost);
        },

         guid : function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return function() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
            };
        },

        render: function () {
            var self = this;
            $("#posts").empty();
            _.each(this.collection.models, function (post) {
                self.renderPost(post);
            }, this);
        },

        renderPost: function (post) {
            var newPost = new Ontraport.Views.Postview({model: post});
            $("#posts").append(newPost.render().el);
        }
    });
})();
