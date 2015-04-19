var React         = require('react');
var Router        = require('react-router');
var Bootstrap     = require('react-bootstrap');
var Input         = Bootstrap.Input;
var Combobox      = require('react-widgets/lib/Combobox');

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getUserDropdown: function(){
    return _.map(require('../../../data/users.json'), function(user){
      return {value:user.id, label:user.username}
    })
  },

  getInitialState: function () {
    return {
      users: this.getUserDropdown(),
      value:""
    }
  },

  onSubmit: function(e){
    e.preventDefault();
  },

  reset: function(){
    this.setState({value:""})
  },

  onSelect: function(res){
    console.log(res);
    this.context.router.transitionTo("profile", {userId: res.value});
    this.setState({value:""});
  },

  render: function(){
    return (
          <Combobox
            data={this.state.users}
            value={this.state.value}
            valueField="value"
            textField="label"
            placeholder="Search ..."
            onSelect={this.onSelect}
          />
    )
  }
})