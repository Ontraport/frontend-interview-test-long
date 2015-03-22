// *********************************************************************************************************************
// Vars and Globals
// *********************************************************************************************************************
// Main namespace tn (the network)
var tn = {},
	Controller;
tn.models = {};
tn.views = {};
tn.collections = {};
tn.api = {};
tn.updateStorage = function(posts, user, users) {
	if( posts ) {
		store.set('posts', tn.collections.posts.toJSON());
	}
	if( users ) {
		store.set('users', tn.collections.users.toJSON());
	}
	if( user ) {
		store.set('currentUser', tn.currentUser.toJSON());
	}
};

// *********************************************************************************************************************
// Models & Collections
// *********************************************************************************************************************
tn.models.User = Backbone.Model.extend({
	defaults : {
		about : '',
		pic : '',
		username : '',
		userImg : function() {
			return this.pic !== '' ? '<img src="' + this.pic + '" height="50" width="50" alt="" />'
				: '<p>No Image Available</p>';
		},
		getLastId : function() {
			tn.collections.users.sortBy('id');
			return tn.collections.users.last().get('id') + 1
		}
	}
});

tn.models.Post = Backbone.Model.extend({
	defaults : {
		comments : [],
		content : '',
		date : new Date(),
		userAbout : function() {
			var user = tn.collections.users.get(this.userId);
			return user ? user.get('about') : 'No Bio';
		},
		userName : function() {
			var user = tn.collections.users.get(this.userId);
			return user ? user.get('username') : 'Unknown User';
		},
		userImg : function() {
			var user = tn.collections.users.get(this.userId);
			return user ? '<img src="' + user.get('pic') + '" height="50" width="50" alt="" />'
				: '<p>No Image Available</p>';
		},
		userImgComment : function(index) {
			var user = tn.collections.users.get(this.comments[ index ].userId);
			return user ? '<img src="' + user.get('pic') + '" height="25" width="25" alt="" />'
				: '<p>No Image Available</p>';
		},
		userNameComment : function(index) {
			var user = tn.collections.users.get(this.comments[ index ].userId);
			return user ? user.get('username') : 'Unknown User';
		},
		postDate : function() {
			if( this.date ) {
				var thisDate = new Date(this.date),
					tmpDate = new Date(),
					dd = thisDate.getDate(),
					mm = thisDate.getMonth() + 1,
					yyyy = thisDate.getFullYear(),
					formattedDate = (( mm < 10 ) ? '0' + mm : mm) + '/' + (( dd < 10 ) ? '0' + dd : dd) + '/' + yyyy;

				// call setHours to take the time out of the comparison
				return ( thisDate.setHours(0, 0, 0, 0) == tmpDate.setHours(0, 0, 0, 0) ) ?
					'Today' : formattedDate;
			}
		}
	}
});

tn.models.Comment = Backbone.Model.extend({
	defaults : {
		userId : '',
		postId : '',
		content : '',
		date : new Date(),
		userName : function() {
			return tn.collections.users.get(this.userId).get('username');
		},
		userImg : function() {
			return '<img src="' + tn.collections.users.get(this.userId).get('pic') + '" height="50" width="50" alt="" />';
		}
	}
});

tn.collections.Users = Backbone.Collection.extend({
	model : tn.models.User,
	url : '/frontend-interview-test-long/codetest/data/users.json'
});
tn.collections.Posts = Backbone.Collection.extend({
	model : tn.models.Post,
	url : '/frontend-interview-test-long/codetest/data/posts.json'
});

// *********************************************************************************************************************
// Views & Layouts
// *********************************************************************************************************************
// Main Layout
tn.views.MainLayout = Mn.LayoutView.extend({
	el : '#appContainer',
	template : '#layout-view-template',
	regions : {
		header : '#header',
		main : '#page',
		footer : '#footer'
	}
});

// Header View
tn.views.HeaderView = Mn.ItemView.extend({
	template : '#header-template',
	className : 'group',
	ui : {
		postAnUpdate : '#postAnUpdate'
	},
	events : {
		'click @ui.postAnUpdate' : 'postAnUpdate'
	},
	postAnUpdate : function() {
		var that = this;
		$('#modalBg').dialog({
			dialogClass : 'noTitleStuff',
			resizable : false,
			width : 320,
			modal : true,
			closeOnEscape : true,
			open : function(e) {
				var $eTarget = $(e.target);
				$eTarget.find('textarea').keypress(function(e) {
					if( e.keyCode == $.ui.keyCode.ENTER && this.value !== '' ) {
						tn.collections.posts.sortBy('id');
						var postModel = new tn.models.Post({
							id : tn.collections.posts.last().get('id') + 1,
							content : this.value,
							userId : tn.currentUserId
						});
						function isInPost(element) { return element.postId == that.model.get('id'); }
						postModel.set('comments', postModel.get('comments').filter(isInPost));
						tn.collections.posts.add(postModel);
						$eTarget.find('textarea').val('');
						$eTarget.dialog('close');
						tn.updateStorage(true);
					}
				});
			}
		});
	}

});

// Footer View
tn.views.FooterView = Mn.ItemView.extend({
	template : '#footer-template',
	ui : {
		clearLocal : '.clearLocal'
	},
	events : {
		'click @ui.clearLocal' : 'clearLocal'
	},
	clearLocal : function(e) {
		e.preventDefault();
		store.clear();
		window.location.reload();
	}
});

// Post View
tn.views.PostView = Mn.ItemView.extend({
	template : '#post-template',
	ui : {
		addComment : '.addCommentText'
	},
	events : {
		'keypress @ui.addComment' : 'addComment'
	},
	initialize : function() {
		this.listenTo(this.model, 'addCommentEvt', this.addCommentEvt);
	},
	addCommentEvt : function() {

		var that = this;

		function isInPost(element) {
			return element.postId == that.model.get('id');
		}

		this.model.set('comments', this.model.get('comments').filter(isInPost));
		this.render();
		tn.updateStorage(true);
	},
	addComment : function(e) {
		if( e.keyCode == $.ui.keyCode.ENTER ) {
			var $ct = $(e.currentTarget),
				postModel = tn.collections.posts.get(this.model.get('id')),
				commentsArr = postModel.get('comments'),
				comment = {
					content : $ct.val(),
					id : postModel.get('comments').length + 1,
					postId : $ct.parents('.post').data('postId'),
					userId : tn.currentUserId
				};
			commentsArr.push(comment);
			postModel.set('comments', commentsArr);
			// TODO - AT
			// Comments and posts should be split into different
			// collections. Then comments rendered in their own
			// collection view, allowing for rendering of
			// just that view vs a repaint of the entire feed.
			postModel.trigger('addCommentEvt');
		}
	}
});

// Feed View
tn.views.FeedView = Mn.CompositeView.extend({
	template : '#feed-template',
	childView : tn.views.PostView,
	childViewContainer : '#feedUl'
});

// *********************************************************************************************************************
// Controller
// *********************************************************************************************************************
Controller = Mn.Controller.extend({
	home : function() {
		tn.views.mainLayout.getRegion('header').show(new tn.views.HeaderView({
			model : tn.currentUser
		}));
		tn.views.mainLayout.getRegion('main').show(new tn.views.FeedView({
			model : tn.currentUser,
			collection : tn.collections.posts
		}));
		tn.views.mainLayout.getRegion('footer').show(new tn.views.FooterView());
	},
	profile : function() {
		// Another View for Example
	}
});

tn.Controller = new Controller();

// *********************************************************************************************************************
// Router
// *********************************************************************************************************************
tn.Router = new Mn.AppRouter({
	controller : tn.Controller,
	appRoutes : {
		'' : 'home',
		profile : 'profile'
	}
});

// *********************************************************************************************************************
// App
// *********************************************************************************************************************
// The App
tn.App = new Mn.Application();

// App Start Event
tn.App.on('before:start', function() {
	// UI Setup
	tn.views.mainLayout = new tn.views.MainLayout();
	tn.views.mainLayout.render();

	// Get Currently Logged in User
	// This could come from anywhere, statically set to 5 for demo
	// Change to users 1-4 to change context to that user
	tn.currentUserId = 5;
});

// App Start Event
tn.App.on('start', function() {

	var getUsers = $.Deferred(),
		getPosts = $.Deferred();

	// Make Users Collection
	if( store.get('users') ) {
		tn.collections.users = new tn.collections.Users(store.get('users'));
		getUsers.resolve()
	} else {
		tn.collections.users = new tn.collections.Users({
			model : tn.models.User
		});
		tn.collections.users.fetch({
			success : function() {
				getUsers.resolve();
			}
		});
	}

	// Make Post Collection
	if( store.get('posts') ) {
		tn.collections.posts = new tn.collections.Posts(store.get('posts'));
		getPosts.resolve();
	} else {
		tn.collections.posts = new tn.collections.Posts({
			model : tn.models.Post
		});

		tn.collections.posts.fetch({
			success : function() {
				getPosts.resolve();
			}
		});
	}

	// Deferred for API call
	$.when(getPosts, getUsers).then(function() {
		tn.currentUser = tn.collections.users.get({ id : tn.currentUserId });
		tn.updateStorage(true, true, true);
		Backbone.history.start();
	});

});

// Initialize Function
function initialize() {
	// Change to true to see storage error
	if( !store.enabled ) {
		$('<div class="storageError"><h1>Local storage is not supported by your browser.<br>' +
		'Please disable "Private Mode", or upgrade to a modern browser.<h1></div>').prependTo('body');
		$('body').addClass('storageBg');
		return
	}

	// Good to go - Star App
	tn.App.start();
}

// Initialize app - Storage Check, then start
initialize();
