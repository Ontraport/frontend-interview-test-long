window.Codetest.Views.PostIndex = Backbone.View.extend({
	template: _.template("HI"),
	
	initialize: function () {
		this.listenTo(this.collection, "add change:title remove reset", this.render)
	},
	
	render: function () {
		var renderedContent = this.template({
			posts: this.collection
		});
		this.$el.html(renderedContent);
		// this.attachSubviews();
		return this;
	}
});