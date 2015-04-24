var MenuBarView = require('./../views/partials/MenuBarView'),
    SearchForm = require('./../views/partials/SearchForm'),
    PostUpdateModalView = require('./../views/PostUpdateModalView'),
    ProfileView = require('./../views/ProfileView');

function MasterController() {
    MenuBarView.on('profile.postUpdate',function(e) {
    	PostUpdateModalView.open();
    });
}

module.exports = new MasterController();
