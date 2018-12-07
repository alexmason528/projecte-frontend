import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavItem, NavbarToggler, Collapse, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Logo from 'components/Logo'

export default class NavBar extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    user: PropTypes.object,
    logOut: PropTypes.func,
    navigate: PropTypes.func,
  }

  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { isLoggedIn, user, logOut, navigate } = this.props
    const { isOpen } = this.state

    return (
      <Navbar color="light" light expand="md">
        <div className="d-flex align-items-center">
          <Logo onClick={() => navigate('/')} />
          Bares für Rares für jeden
        </div>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isLoggedIn ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {user.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => navigate('/me')}>Profile</DropdownItem>
                  <DropdownItem onClick={logOut}>Log out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem className="text-uppercase" onClick={() => navigate('/auth')}>
                Login / Register
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
