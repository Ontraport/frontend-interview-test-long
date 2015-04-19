var React             = require('react');
var Post              = require('./post');
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

  mixins:[Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('post')],

  sort: function(posts){
    return _.sortBy(posts, function(post){
      return - post.id
    })
  },

  getStateFromFlux: function(){
    var PostStore = this.getFlux().store('post');
    var router = this.context.router;
    var currentParams = router.getCurrentParams();

    return {
      posts: this.sort(_.isUndefined(currentParams.userId) ? PostStore.getAll() : PostStore.getByUser(currentParams.userId))
    }
  },

  componentWillReceiveProps: function(){
    this.replaceState(this.getStateFromFlux())
  },

  render: function(){
    return(
      <Grid fluid={true}>
        <Row className="panel">
          <Col xs={12}>
            <h2>{this.props.title}</h2>
          {this.state.posts.map(function(post){
            return <Post {... post}  />
          }.bind(this))}
          </Col>
        </Row>
      </Grid>
    )
  }
});