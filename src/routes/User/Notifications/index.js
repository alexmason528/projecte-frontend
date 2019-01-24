import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

export class Notifications extends Component {
  render() {
    return (
      <h3>
        <FormattedMessage id="estify.notifications" />
      </h3>
    )
  }
}

export default Notifications
