window.Codetest.Models.Comment = Backbone.Model.extend({
	urlRoot: function () {
		return this.post["comments"]
	}
});