import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, UncontrolledAlert } from 'reactstrap'

export default class EmailVerifyAlert extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      email_verified: PropTypes.bool,
    }),
    sendEmail: PropTypes.func,
  }

  render() {
    const { user } = this.props

    if (!user || user.email_verified) {
      return null
    }

    const { username, email, sendEmail } = user

    return (
      <UncontrolledAlert color="warning">
        Hi {username}, your email - {email} is not verified yet. <br />
        Please click{' '}
        <Button color="link" className="decoration-none p-0" onClick={sendEmail}>
          here
        </Button>{' '}
        to send verification code to your email.
      </UncontrolledAlert>
    )
  }
}
