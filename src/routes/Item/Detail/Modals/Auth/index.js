import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { Modal, ModalBody } from 'reactstrap'
import swal from 'sweetalert'
import {
  logIn,
  register,
  sendPasswordResetEmail,
  selectAuthStatus,
  selectAuthError,
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_SEND_PASSWORD_RESET_EMAIL,
} from 'store/modules/auth'
import { successAction } from 'utils/state-helpers'
import LogInForm from './Forms/LogIn'
import RegisterForm from './Forms/Register'
import PasswordResetForm from './Forms/PasswordReset'

export class AuthModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    status: PropTypes.string,
    error: PropTypes.string,
    toggle: PropTypes.func,
    logIn: PropTypes.func,
    register: PropTypes.func,
    sendPasswordResetEmail: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      formType: 'logIn',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { status } = this.props

    if (status === AUTH_LOGIN && nextProps.status !== status) {
      const success = nextProps.status === successAction(AUTH_LOGIN)

      if (success) {
        this.props.toggle()
        this.props.history.push('/me/profile')
      } else {
        swal({ className: 'pe-swal', text: nextProps.error })
      }
    }

    if (status === AUTH_REGISTER && nextProps.status !== status) {
      const success = nextProps.status === successAction(AUTH_REGISTER)

      if (success) {
        this.props.toggle()
        this.props.history.push('/me/profile')
      }

      swal({ className: 'pe-swal', text: success ? 'You are registered successfully' : nextProps.error })
    }

    if (status === AUTH_SEND_PASSWORD_RESET_EMAIL && nextProps.status !== status) {
      const success = nextProps.status === successAction(AUTH_SEND_PASSWORD_RESET_EMAIL)

      if (success) {
        this.props.toggle()
      }

      swal({ className: 'pe-swal', text: success ? 'Sent password reset email. \n\n Please check your inbox.' : nextProps.error })
    }
  }

  get inProgress() {
    const { status } = this.props

    return status === AUTH_LOGIN || status === AUTH_REGISTER || status === AUTH_SEND_PASSWORD_RESET_EMAIL
  }

  handleChangeFormType = formType => {
    !this.inProgress && this.setState({ formType })
  }

  handleToggle = () => {
    !this.inProgress && this.props.toggle()
  }

  render() {
    const { isOpen, status } = this.props
    const { formType } = this.state

    const loggingIn = status === AUTH_LOGIN
    const registering = status === AUTH_REGISTER
    const sendingPasswordResetEmail = status === AUTH_SEND_PASSWORD_RESET_EMAIL

    return (
      <Modal className="popup-modal auth-modal" isOpen={isOpen} toggle={this.handleToggle}>
        <ModalBody className="pe-box">
          {formType === 'logIn' && (
            <LogInForm loading={loggingIn} onSubmit={this.props.logIn} onChangeFormType={this.handleChangeFormType} />
          )}
          {formType === 'register' && (
            <RegisterForm loading={registering} onSubmit={this.props.register} onChangeFormType={this.handleChangeFormType} />
          )}
          {formType === 'passwordReset' && (
            <PasswordResetForm
              loading={sendingPasswordResetEmail}
              onSubmit={this.props.sendPasswordResetEmail}
              onChangeFormType={this.handleChangeFormType}
            />
          )}
        </ModalBody>
      </Modal>
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
  sendPasswordResetEmail,
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(AuthModal)
