var React        = require('react/addons');
var Bootstrap    = require('react-bootstrap');
var Modal        = Bootstrap.Modal;
var Button       = Bootstrap.Button;
var Input        = Bootstrap.Input;
var Grid         = Bootstrap.Grid;
var Row          = Bootstrap.Row;
var Col          = Bootstrap.Col;
var Fluxxor      = require('fluxxor');
var moment       = require('moment');
var _            = require('lodash');


module.exports = React.createClass({

  mixins:[React.addons.LinkedStateMixin, Fluxxor.FluxMixin(React)],

  getInitialState: function(){
    return {
      content:"",
      inputStyle:""
    }
  },

  onSubmit: function(e){
    e.preventDefault();
    if(_.isEmpty(this.state.content)){
      this.setState({inputStyle:"error"});
    }else{
      this.getFlux().actions.post.add(this.state.content);
      this.props.onRequestHide();
    }

  },

  validationState: function(){
    return _.isEmpty(this.state.content) && this.state.init ? "error" : ""
  },

  render: function(){
    console.log(this.props);
    return (
      <Modal {...this.props} bsStyle='primary' title='New Post' animation>
        <Grid fluid={true}>
          <Row>
            <Col xs={12}>
              <form onSubmit={this.onSubmit}>
                <Input bsStyle={this.state.inputStyle} type="textarea" placeholder="Enter new post" valueLink={this.linkState('content')} />
                <Input type="submit" value="Submit" />
              </form>
            </Col>
          </Row>
        </Grid>
      </Modal>
    )
  }
});