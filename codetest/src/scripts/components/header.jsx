var React             = require('react');
var Router            = require('react-router');
var Link              = Router.Link;
var Bootstrap         = require('react-bootstrap');
var UserSearch        = require('./user-search');
var Navbar            = Bootstrap.Navbar;
var DropdownButton    = Bootstrap.DropdownButton;
var CollapsableNav    = Bootstrap.CollapsableNav;
var Nav               = Bootstrap.Nav;
var NavItem           = Bootstrap.NavItem;
var MenuItem          = Bootstrap.MenuItem;
var Grid              = Bootstrap.Grid;
var Col               = Bootstrap.Col;
var Row               = Bootstrap.Row;
var Button            = Bootstrap.Button;
var OverlayTrigger    = Bootstrap.OverlayTrigger;
var Tooltip           = Bootstrap.Tooltip;
var ModalTrigger      = Bootstrap.ModalTrigger;
var NewPost           = require('./new-post');
var _                 = require('lodash');




module.exports = React.createClass({

  render: function(){
    return (
      <Navbar fixedTop brand={<Link to="home"><img className="img-responsive" src="images/logo.png" alt="the network"/></Link>} toggleNavKey={0}>
        <CollapsableNav eventKey={0}>
          <Nav navbar>
            <NavItem eventKey={1} ><UserSearch {... this.props} /></NavItem>
          </Nav>
          <Nav navbar right>
            <NavItem eventKey={1} >
              <OverlayTrigger placement='left' overlay={<Tooltip>Add a post</Tooltip>}>
                <ModalTrigger modal={React.createElement(NewPost,_.assign(this.props, {flux:this.props.flux}))} >
                  <Button><i className="fa fa-pencil"/></Button>
                </ModalTrigger>
              </OverlayTrigger>
            </NavItem>
          </Nav>
        </CollapsableNav>
      </Navbar>
    )
  }
});