import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { Button, Row, Col } from 'reactstrap'
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io'
import { parse } from 'query-string'
import { selectAuthStatus, selectAuthError, passwordReset, selectNewPassword, AUTH_PASSWORD_RESET } from 'store/modules/auth'
import { Loader } from 'components'
import { successAction, failAction } from 'utils/state-helpers'

export class PasswordResetPage extends Component {
  static propTypes = {
    newPassword: PropTypes.string,
    status: PropTypes.string,
    error: PropTypes.string,
    passwordReset: PropTypes.func,
  }

  componentWillMount() {
    const { location } = this.props

    const { code } = parse(location.search)

    if (code) {
      this.props.passwordReset({ token: code })
    } else {
      this.props.history.push('/auth')
    }
  }

  gotoAuthPage = () => {
    this.props.history.push('/auth')
  }

  getTitle = () => {
    const { status } = this.props

    let text

    if (status === AUTH_PASSWORD_RESET) {
      text = 'Resetting your passsword now...'
    } else if (status === successAction(AUTH_PASSWORD_RESET)) {
      text = 'Password is resetted'
    } else {
      text = 'Failed to reset your password'
    }

    return <h3>{text}</h3>
  }

  render() {
    const { newPassword, status, error } = this.props
    const loading = status === AUTH_PASSWORD_RESET
    const success = status === successAction(AUTH_PASSWORD_RESET)
    const fail = status === failAction(AUTH_PASSWORD_RESET)

    return (
      <div className="password-reset-page">
        <Row className="text-center">
          <Col md={12}>{this.getTitle()}</Col>
          {loading && (
            <Col md={12}>
              <Loader />
            </Col>
          )}

          <Col md={12}>
            {success && (
              <Fragment>
                <IoIosCheckmarkCircleOutline style={{ fontSize: 50 }} />
                <div className="text-success my-4">This is your new Password: {newPassword}</div>
              </Fragment>
            )}
            {fail && (
              <Fragment>
                <IoIosCloseCircleOutline className="text-danger" style={{ fontSize: 50 }} />
                <div className="text-danger my-4">{error}</div>
              </Fragment>
            )}
            {!loading && (
              <Fragment>
                <Button color="link" className="decoration-none p-0" onClick={this.gotoAuthPage}>
                  Click here
                </Button>{' '}
                to go to Auth page
              </Fragment>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

const selectors = createStructuredSelector({
  newPassword: selectNewPassword,
  status: selectAuthStatus,
  error: selectAuthError,
})

const actions = {
  passwordReset,
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(PasswordResetPage)
