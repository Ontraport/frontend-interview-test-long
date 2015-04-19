var React = require('react');
var Bootstrap         = require('react-bootstrap');
var Grid              = Bootstrap.Grid;
var Col               = Bootstrap.Col;
var Row               = Bootstrap.Row;

module.exports = React.createClass({
  render: function(){
    return (
      <Grid>
        <Row>
          <Col xs={8} xsPush={2}>
            <section className="well"><h1>404 Page Not Found</h1></section>
          </Col>
        </Row>
      </Grid>
    )
  }
})