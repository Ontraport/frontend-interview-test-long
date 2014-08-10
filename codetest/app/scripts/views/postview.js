/*global Ontraport, Backbone*/

Ontraport.Views = Ontraport.Views || {};

(function () {
    'use strict';

    Ontraport.Views.Postview = Backbone.View.extend({

        template: _.template($('#postTemplate').html()),

        events: {
            'keyup .commentText': 'checkEnter'
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        addComment: function (e) {
            if(!this.model){
                this.commentList = new Ontraport.Collections.Comments();
            }else{
                this.commentList = this.model.get('comments');
            }
            this.commentList.add({
                "postId": this.model.get('id'),
                "author": this.model.get('author'),
                "date": moment().calendar(),
                "content": $(e.currentTarget).val()
            });
            this.model.set('comments', this.commentList);
            this.render();
            $(e.currentTarget).val('');
        },

        checkEnter: function (e) {
            if (e.which === 13) {
                if ($(e.currentTarget).val() !== '') {
                    this.addComment(e);
                }
            }
        }
    });

})();
