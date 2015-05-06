var React        = require('react');
var Router       = require('react-router');
var RouteHandler = Router.RouteHandler;
var Header       = require('./header');
var Profile      = require('./profile');

module.exports = React.createClass({

  render: function(){
    return (
      <section id="app">
        <Header {... this.props}/>
        <RouteHandler {... this.props}/>
      </section>
    )
  }
});