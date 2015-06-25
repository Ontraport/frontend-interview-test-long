window.Codetest.Collections.Users = Backbone.Collection.extend({
	url: "/data/users.json",
	model: Codetest.Models.User,
	
	getOrFetch: function(id) {
	  	var user = this.get(id)
	  	var users = this
	  	if(!user){
	  		user = new Codetest.Models.User({ id: id })
	  		user.fetch({
	  			success: function(){
	  				users.add(user)
	  			}
	  		})
	  	} else {
	  		user.fetch()
	  	}

	  	return user
	  }
});

Codetest.Collections.users = new Codetest.Collections.Users();
Codetest.Collections.users.fetch();