window.Codetest.Collections.Comments = Backbone.Collection.extend({
	url: function () {
		return this.post["comments"]
	},
	model: Getable.Models.Comment,
	
	initialize: function (models, options){
			this.post = options.post;
	}
});