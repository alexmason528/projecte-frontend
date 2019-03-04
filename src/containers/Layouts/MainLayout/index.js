import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { Container, Row, Col } from 'reactstrap'
import { logOut, selectUserData, selectIsLoggedIn } from 'store/modules/auth'
import { NavBar } from 'components'

class MainLayout extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    user: PropTypes.object,
    logOut: PropTypes.func,
  }

  render() {
    const { user, children, isLoggedIn, history, logOut } = this.props

    return (
      <Container className="main-container d-flex flex-column">
        <Row className="header">
          <Col>
            <NavBar user={user} isLoggedIn={isLoggedIn} logOut={logOut} navigate={history.push} />
          </Col>
        </Row>
        <Row className="main-content flex-grow-1 pb-3">
          <Col>{children}</Col>
        </Row>
        <Row>
          <Col>
            <div className="footer text-right py-4">
              <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/imprint">Imprint</Link>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const selectors = createStructuredSelector({
  user: selectUserData,
  isLoggedIn: selectIsLoggedIn,
})

const actions = {
  logOut,
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(MainLayout)
