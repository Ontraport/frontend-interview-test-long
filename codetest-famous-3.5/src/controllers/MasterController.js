var MenuBarView = require('./../views/partials/MenuBarView'),
    SearchForm = require('./../views/partials/SearchForm'),
    PostUpdateModalView = require('./../views/PostUpdateModalView'),
    AppService = require('./../services/AppService'),
    PostModel = require('./../models/PostModel'),
    PostService = require('./../services/PostService'),
    UpdatesView = require('./../views/partials/UpdatesView'),
    ProfileView = require('./../views/ProfileView');

function MasterController() {
    MenuBarView.on('profile.postUpdate', function(e) {
        PostUpdateModalView.open();
    });

    PostUpdateModalView.on('save', function(e) {
        if (e.text.trim().length > 0) {
            var user = AppService.getUser();
            // save
            PostService.addPost(new PostModel(user.id, e.text)).then(function(postModel) {
                // store the new post id
                UpdatesView.addPost({
                    id: postModel.id,
                    username: user.username,
                    pic: user.pic,
                    text: e.text
                });
            });
        }
    });

    SearchForm.on('submit',function(e){
        UpdatesView.search(e.query);
    });
}

module.exports = new MasterController();
