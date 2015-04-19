var React             = require('react');
var Router            = require('react-router');
var Bootstrap         = require('react-bootstrap');
var Fluxxor           = require('fluxxor');
var Grid              = Bootstrap.Grid;
var Col               = Bootstrap.Col;
var Row               = Bootstrap.Row;
var _                 = require('lodash');

module.exports = React.createClass({

  contextTypes:{
    router: React.PropTypes.func
  },

  mixins:[Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('user')],

  getStateFromFlux: function(){
    var UserStore = this.getFlux().store('user');
    var router = this.context.router;
    var currentParams = router.getCurrentParams();

    return {
      user: _.isUndefined(currentParams.userId) ? UserStore.getCurrent() : UserStore.get(currentParams.userId)
    }
  },

  componentWillReceiveProps: function(){
    this.replaceState(this.getStateFromFlux())
  },

  render: function(){
    return (
        <Grid fluid={true}>
          <Row className="panel">
            <Col xs={12} md={4}>
              <img className="img-responsive img-circle img-border" src={this.state.user.pic}  alt={"profile picture for " + this.state.user.username} />
            </Col>
            <Col xs={12} md={8}>
              <h1>{this.state.user.username}</h1>
              <p>{this.state.user.about}</p>
            </Col>
          </Row>
        </Grid>
    )
  }
});