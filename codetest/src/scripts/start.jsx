var React     = require('react');
var Fluxxor   = require('fluxxor');
var Router    = require('react-router');
var App       = require('./components/app');
var routes    = require('./components/routes');
var UserStore = require('./stores/user');
var PostStore = require('./stores/post');
var ls        = require('local-storage');


var stores = {
  "post": new PostStore(),
  "user": new UserStore({current:5})
};

var actions = require('./actions');


var flux = new Fluxxor.Flux(stores, actions);

flux.actions.post.load(_.isNull(ls.get('posts')) ? require('../../data/posts.json') : JSON.parse(ls.get('posts')));
flux.actions.user.load((_.isNull(ls.get('users')) ? require('../../data/users.json') : JSON.parse(ls.get('users'))));

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler flux={flux} />, document.body);
});
