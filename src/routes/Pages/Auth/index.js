import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { Alert, Row, Col } from 'reactstrap'
import { logIn, register, selectAuthStatus, selectAuthError, AUTH_LOGIN, AUTH_REGISTER } from 'store/modules/auth'
import { LogInForm, RegisterForm } from 'components'
import { failAction } from 'utils/state-helpers'

export class AuthPage extends Component {
  static propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    logIn: PropTypes.func,
    register: PropTypes.func,
  }

  handleLogin = values => {
    this.props.logIn(values)
  }

  handleRegister = values => {
    this.props.register(values)
  }

  render() {
    const { status, error } = this.props

    const loginFailed = status === failAction(AUTH_LOGIN)
    const loggingIn = status === AUTH_LOGIN

    const registerFailed = status === failAction(AUTH_REGISTER)
    const registering = status === AUTH_REGISTER

    return (
      <Row className="auth-page">
        <Col md={6} sm={12}>
          <h4 className="text-uppercase form-title">
            <FormattedMessage id="estify.logIn" />
          </h4>
          {loginFailed && (
            <Alert color="danger" className="mb-3">
              {error}
            </Alert>
          )}
          <LogInForm loggingIn={loggingIn} onSubmit={this.handleLogin} />
        </Col>
        <Col md={6} sm={12}>
          <h4 className="text-uppercase form-title">
            <FormattedMessage id="estify.register" />
          </h4>
          {registerFailed && (
            <Alert color="danger" className="mb-3">
              {error}
            </Alert>
          )}
          <RegisterForm registering={registering} onSubmit={this.handleRegister} />
        </Col>
      </Row>
    )
  }
}

const selectors = createStructuredSelector({
  status: selectAuthStatus,
  error: selectAuthError,
})

const actions = {
  logIn,
  register,
}

export default connect(
  selectors,
  actions,
)(AuthPage)
