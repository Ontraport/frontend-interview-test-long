window.Codetest.Models.Post = Backbone.Model.extend({
	urlRoot: "../data/posts.json",
	comments: function () {
		this._comments = this._comments ||
		new Getable.Collections.Comments([], { restaurant: this});
		return this._comments
	},
	
	parse: function (payload) {
		if (payload.comments) {
			this.comments().add(payload.comments, {parse : true});
			delete payload.comments
		}
		
		return payload;
	}
});