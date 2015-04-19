var React             = require('react/addons');
var Bootstrap         = require('react-bootstrap');
var Fluxxor           = require('fluxxor');
var Grid              = Bootstrap.Grid;
var Col               = Bootstrap.Col;
var Row               = Bootstrap.Row;
var Input             = Bootstrap.Input;
var _                 = require('lodash');
var Router            = require('react-router');
var Link              = Router.Link;
var moment            = require('moment');
var FluxMixin         = Fluxxor.FluxMixin;
var StoreWatchMixin   = Fluxxor.StoreWatchMixin;


var Item = React.createClass({

  mixins:[FluxMixin(React), StoreWatchMixin('user')],

  getStateFromFlux: function(){
    return {}
  },

  getUser: function(){
    return this.getFlux().store('user').get(this.props.userId)
  },

  componentWillReceiveProps: function(){
    this.replaceState(this.getStateFromFlux())
  },

  getTime: function(){
    return _.isEmpty(this.props.date) ? null : <time><i className="fa fa-clock-o"></i>{moment(this.props.date).fromNow()}</time>
  },

  render: function(){
    var user = this.getUser();
    return (
      <Row className="item">
        <Col xs={4} sm={2}>
          <Link to="profile" params={{userId:user.id}}><img className="img-responsive img-circle img-border" src={user.pic} /></Link>
        </Col>
        <Col xs={8} sm={10}>
          <header>
            <Link to="profile" params={{userId:user.id}}>{user.username}</Link>
          {this.getTime()}
          </header>
          <p>{this.props.content}</p>
        </Col>
      </Row>
    )
  }
});

var NewComment = React.createClass({

  mixins: [React.addons.LinkedStateMixin, FluxMixin(React)],

  getInitialState: function(){
  return {
    content:"",
    inputStyle:""
  }
  },

  onSubmit: function(e){
    e.preventDefault();
    if(_.isEmpty(this.state.content)){
      this.setState({inputStyle:"error"})
    }else{
      this.getFlux().actions.post.addComment(this.state.content, this.props.postId);
      this.setState({content:"", inputStyle:""});
    }
  },

  render: function(){
    return (
      <form onSubmit={this.onSubmit}>
        <Input type="text" bsStyle={this.state.inputStyle} valueLink={this.linkState('content')} placeholder="Post a Comment..." />
      </form>
    )
  }
});

module.exports = React.createClass({


  renderComments: function(){
    return (
      <Row>
        <Col xs={10} xsPush={2} sm={11} smPush={1} className="comments">
          {this.props.comments.map(function(comment){
            return <Item {... comment}/>
          }.bind(this))}
          <NewComment postId={this.props.id}/>
        </Col>
      </Row>
    )
  },

  render: function(){
    return(
      <Grid fluid={true} className="post">
        <Item {... this.props} />
      {this.renderComments()}
      </Grid>
    )
  }
});