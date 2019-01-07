import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavItem, NavbarToggler, Collapse, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Logo } from 'components'
import { getUserPhotoUrl } from 'utils/common'

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
      <Navbar expand="md" style={{ padding: '1.5rem 0' }}>
        <div className="d-flex align-items-center">
          <Logo className="logo mr-4 c-pointer" onClick={() => navigate('/')} />
          Bares für Rares für jeden
        </div>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isLoggedIn ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {user.username}
                  <img src={getUserPhotoUrl(user.photo)} className="mx-2" style={{ width: 30, height: 30 }} alt="" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => navigate('/me')}>Profile</DropdownItem>
                  <DropdownItem onClick={logOut}>Log out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem className="text-uppercase c-pointer" onClick={() => navigate('/auth')}>
                Login / Register
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
