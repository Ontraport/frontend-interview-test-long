var React               = require('react');
var Router              = require('react-router');
var Route               = Router.Route;
var DefaultRoute        = Router.DefaultRoute;
var NotFoundRoute       = Router.NotFoundRoute;
var Redirect            = Router.Redirect;

module.exports = (
    <Route name="home" handler={require('./app.jsx')} path="/codetest/" >
      <Redirect path="/codetest" to="home" />
      <Route name="profile" handler={require('./profile.jsx')} path="profile/:userId" />
      <DefaultRoute handler={require('./profile.jsx')} />
      <NotFoundRoute handler={require('./not-found.jsx')} />
    </Route>
);