import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button, UncontrolledAlert } from 'reactstrap'
import { BounceLoader } from 'react-spinners'
import swal from 'sweetalert'
import { sendVerifyEmail, selectUserData, selectAuthStatus, SEND_VERIFY_EMAIL } from 'store/modules/auth'
import { successAction } from 'utils/state-helpers'

export class EmailVerifyAlert extends Component {
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

    if (status === SEND_VERIFY_EMAIL && nextProps.status !== status) {
      const success = nextProps.status === successAction(SEND_VERIFY_EMAIL)
      swal({
        icon: success ? 'success' : 'error',
        text: success
          ? 'Successfully sent verification code to your email.\n\n Check your inbox.'
          : 'Failed to send verification code to your email',
      })
    }
  }

  handleSendEmail = () => {
    const { status, sendVerifyEmail } = this.props
    status !== SEND_VERIFY_EMAIL && sendVerifyEmail()
  }

  render() {
    const { user, status } = this.props

    if (!user || user.email_verified) {
      return null
    }

    const { username, email } = user
    const pending = status === SEND_VERIFY_EMAIL

    return (
      <UncontrolledAlert color="warning" className="mb-0">
        Hi {username}, your email - {email} is not verified yet. <br />
        Please click{' '}
        <Button color="link" className="decoration-none p-0" onClick={this.handleSendEmail}>
          here
        </Button>{' '}
        to send verification email.
        {pending && (
          <div className="verify-alert-loader">
            <BounceLoader size={30} color="#856404" />
          </div>
        )}
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
)(EmailVerifyAlert)