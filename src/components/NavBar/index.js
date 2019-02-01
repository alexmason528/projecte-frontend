import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
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
      <Navbar expand="xs" style={{ padding: '1.5rem 0' }}>
        <Logo className="logo mr-4 c-pointer mb-2" onClick={() => navigate('/')} />
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar className="mt-0">
          <Nav className="ml-auto" navbar>
            {isLoggedIn ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {user.username}
                  <img src={getUserPhotoUrl(user.photo)} className="mx-2" style={{ width: 30, height: 30 }} alt="" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => navigate('/me')}>
                    <FormattedMessage id="estify.profile" />
                  </DropdownItem>
                  <DropdownItem onClick={logOut}>
                    <FormattedMessage id="estify.logOut" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem className="text-uppercase c-pointer" onClick={() => navigate('/auth')}>
                <FormattedMessage id="estify.logIn" /> / <FormattedMessage id="estify.register" />
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
