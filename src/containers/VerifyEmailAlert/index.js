import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button, UncontrolledAlert } from 'reactstrap'
import { injectIntl, intlShape } from 'react-intl'
import swal from 'sweetalert'
import { sendVerifyEmail, selectUserData, selectAuthStatus, AUTH_SEND_VERIFY_EMAIL } from 'store/modules/auth'
import { Loader } from 'components'
import { successAction } from 'utils/state-helpers'
import messages from 'messages'

export class VerifyEmailAlert extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      email_verified: PropTypes.bool,
    }),
    status: PropTypes.string,
    sendVerifyEmail: PropTypes.func,
    intl: intlShape.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { status, intl } = this.props

    if (status === AUTH_SEND_VERIFY_EMAIL && nextProps.status !== status) {
      const success = nextProps.status === successAction(AUTH_SEND_VERIFY_EMAIL)
      swal({
        className: 'pe-swal',
        text: intl.formatMessage(success ? messages.sendVerificationCodeSuccess : messages.sendVerificationCodeFail),
      })
    }
  }

  handleSendEmail = () => {
    const { status, sendVerifyEmail } = this.props
    status !== AUTH_SEND_VERIFY_EMAIL && sendVerifyEmail()
  }

  render() {
    const { user, status, intl } = this.props
    const { formatMessage } = intl

    if (!user || user.email_verified) {
      return null
    }

    const { username, email } = user
    const pending = status === AUTH_SEND_VERIFY_EMAIL

    return (
      <UncontrolledAlert color="warning">
        {formatMessage(messages.emailVerifyAlert, { username, email })} <br />
        {formatMessage(messages.pleaseClick)}{' '}
        <Button color="link" className="decoration-none p-0" onClick={this.handleSendEmail}>
          {formatMessage(messages.here)}
        </Button>{' '}
        {formatMessage(messages.toSendVerificationEmail)}
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

export default compose(
  injectIntl,
  connect(
    selectors,
    actions,
  ),
)(VerifyEmailAlert)
