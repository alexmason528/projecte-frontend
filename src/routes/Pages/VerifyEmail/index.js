import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { Button, Container, Row, Col } from 'reactstrap'
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io'
import { parse } from 'query-string'
import { selectIsLoggedIn, selectAuthStatus, selectUserData, selectAuthError, verifyEmail, VERIFY_EMAIL } from 'store/modules/auth'
import { QuarterSpinner } from 'components'
import { successAction, failAction } from 'utils/state-helpers'

export class VerifyEmail extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    status: PropTypes.string,
    user: PropTypes.object,
    error: PropTypes.string,
    verifyEmail: PropTypes.func,
  }

  componentWillMount() {
    const { location, loggedIn, user } = this.props

    if (loggedIn && user.email_verified) {
      this.props.history.push('/')
    }

    const { code } = parse(location.search)

    if (code) {
      this.props.verifyEmail({ token: code })
    } else {
      this.props.history.push('/auth')
    }
  }

  gotoHomePage = () => {
    this.props.history.push('/')
  }

  gotoAuthPage = () => {
    this.props.history.push('/auth')
  }

  getTitle = () => {
    const { status } = this.props

    let text

    if (status === VERIFY_EMAIL) {
      text = 'Verifying your email now...'
    } else if (status === successAction(VERIFY_EMAIL)) {
      text = 'Email is verified now'
    } else {
      text = 'Failed to verify your email'
    }

    return <h3>{text}</h3>
  }

  render() {
    const { status, error } = this.props
    const loading = status === VERIFY_EMAIL
    const success = status === successAction(VERIFY_EMAIL)
    const fail = status === failAction(VERIFY_EMAIL)

    return (
      <Container>
        <Row className="text-center">
          <Col md={12}>{this.getTitle()}</Col>
          {loading && (
            <Col md={12}>
              <QuarterSpinner />
            </Col>
          )}

          {success && (
            <Col md={12}>
              <div className="text-success my-3">
                <IoIosCheckmarkCircleOutline style={{ fontSize: 50 }} />
              </div>
              <Button color="link" className="decoration-none p-0" onClick={this.gotoHomePage}>
                Click here
              </Button>{' '}
              to go to Home Page
            </Col>
          )}

          {fail && (
            <Col md={12}>
              <IoIosCloseCircleOutline className="text-danger" style={{ fontSize: 50 }} />
              <div className="text-danger my-4">{error}</div>
              <Button color="link" className="decoration-none p-0" onClick={this.gotoAuthPage}>
                Click here
              </Button>{' '}
              to go to Auth Page
            </Col>
          )}
        </Row>
      </Container>
    )
  }
}

const selectors = createStructuredSelector({
  isLoggedIn: selectIsLoggedIn,
  status: selectAuthStatus,
  user: selectUserData,
  error: selectAuthError,
})

const actions = {
  verifyEmail,
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(VerifyEmail)
