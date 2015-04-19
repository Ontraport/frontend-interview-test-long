var React             = require('react');
var Bootstrap         = require('react-bootstrap');

var Grid              = Bootstrap.Grid;
var Col               = Bootstrap.Col;
var Row               = Bootstrap.Row;
var User              = require('./user');
var Feed              = require('./feed');


module.exports = React.createClass({

  render: function(){
    return (
        <Grid>
          <Row>
            <Col xs={12} sm={3} md={4} componentClass="aside">
              <User {... this.props} />
            </Col>
            <Col xs={12} sm={9} md={8} componetClass="section">
              <Feed {... this.props} />
            </Col>
          </Row>
        </Grid>
    )
  }
});