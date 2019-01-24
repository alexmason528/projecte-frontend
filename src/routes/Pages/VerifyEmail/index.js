import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { Button, Row, Col } from 'reactstrap'
import { injectIntl, intlShape } from 'react-intl'
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io'
import { parse } from 'query-string'
import { selectIsLoggedIn, selectAuthStatus, selectUserData, selectAuthError, verifyEmail, AUTH_VERIFY_EMAIL } from 'store/modules/auth'
import { Loader } from 'components'
import { successAction, failAction } from 'utils/state-helpers'
import messages from 'messages'

export class VerifyEmailPage extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    status: PropTypes.string,
    user: PropTypes.object,
    error: PropTypes.string,
    verifyEmail: PropTypes.func,
    intl: intlShape.isRequired,
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
    const { status, intl } = this.props
    const { formatMessage } = intl

    let text

    if (status === AUTH_VERIFY_EMAIL) {
      text = formatMessage(messages.emailVerifyPending)
    } else if (status === successAction(AUTH_VERIFY_EMAIL)) {
      text = formatMessage(messages.emailVerifySuccess)
    } else {
      text = formatMessage(messages.emailVerifyFail)
    }

    return <h3>{text}</h3>
  }

  render() {
    const { intl, status, error } = this.props
    const loading = status === AUTH_VERIFY_EMAIL
    const success = status === successAction(AUTH_VERIFY_EMAIL)
    const fail = status === failAction(AUTH_VERIFY_EMAIL)
    const { formatMessage } = intl

    return (
      <div className="verify-email-page">
        <Row className="text-center">
          <Col md={12}>{this.getTitle()}</Col>
          {loading && (
            <Col md={12}>
              <Loader />
            </Col>
          )}

          {success && (
            <Col md={12}>
              <div className="text-success my-3">
                <IoIosCheckmarkCircleOutline style={{ fontSize: 50 }} />
              </div>
              <Button color="link" className="decoration-none p-0" onClick={this.gotoHomePage}>
                {formatMessage(messages.clickHere)}
              </Button>{' '}
              {formatMessage(messages.toHomePage)}
            </Col>
          )}

          {fail && (
            <Col md={12}>
              <IoIosCloseCircleOutline className="text-danger" style={{ fontSize: 50 }} />
              <div className="text-danger my-4">{error}</div>
              <Button color="link" className="decoration-none p-0" onClick={this.gotoAuthPage}>
                {formatMessage(messages.clickHere)}
              </Button>{' '}
              {formatMessage(messages.toAuthPage)}
            </Col>
          )}
        </Row>
      </div>
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
  injectIntl,
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(VerifyEmailPage)
