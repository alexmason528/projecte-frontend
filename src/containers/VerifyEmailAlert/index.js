import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button, UncontrolledAlert } from 'reactstrap'
import swal from 'sweetalert'
import { sendVerifyEmail, selectUserData, selectAuthStatus, AUTH_SEND_VERIFY_EMAIL } from 'store/modules/auth'
import { Loader } from 'components'
import { successAction } from 'utils/state-helpers'

export class VerifyEmailAlert extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      email_verified: PropTypes.bool,
    }),
    status: PropTypes.string,
    sendVerifyEmail: PropTypes.func,
  }

  componentWillReceiveProps(nextProps) {
    const { status } = this.props

    if (status === AUTH_SEND_VERIFY_EMAIL && nextProps.status !== status) {
      const success = nextProps.status === successAction(AUTH_SEND_VERIFY_EMAIL)
      swal({
        icon: success ? 'success' : 'error',
        text: success
          ? 'Successfully sent verification code to your email.\n\n Check your inbox.'
          : 'Failed to send verification code to your email.',
      })
    }
  }

  handleSendEmail = () => {
    const { status, sendVerifyEmail } = this.props
    status !== AUTH_SEND_VERIFY_EMAIL && sendVerifyEmail()
  }

  render() {
    const { user, status } = this.props

    if (!user || user.email_verified) {
      return null
    }

    const { username, email } = user
    const pending = status === AUTH_SEND_VERIFY_EMAIL

    return (
      <UncontrolledAlert color="warning">
        Hi {username}, your email - {email} is not verified yet. <br />
        Please click{' '}
        <Button color="link" className="decoration-none p-0" onClick={this.handleSendEmail}>
          here
        </Button>{' '}
        to send verification email.
        {pending && <Loader className="loader pos-center" />}
      </UncontrolledAlert>
    )
  }
}

const selectors = createStructuredSelector({
  user: selectUserData,
  status: selectAuthStatus,
})

const actions = {
  sendVerifyEmail,
}

export default connect(
  selectors,
  actions,
)(VerifyEmailAlert)
