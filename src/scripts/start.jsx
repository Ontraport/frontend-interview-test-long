var React     = require('react');
var Fluxxor   = require('fluxxor');
var Router    = require('react-router');
var App       = require('./components/app');
var routes    = require('./components/routes');

var stores = {
};

var actions = require('./actions');

var flux = new Fluxxor.Flux(stores, actions);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler flux={flux} />, document.body);
});
