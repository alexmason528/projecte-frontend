import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { Row, Col } from 'reactstrap'
import { injectIntl, intlShape } from 'react-intl'
import { IoMdAddCircleOutline } from 'react-icons/io'
import swal from 'sweetalert'
import { sendVerifyEmail, selectIsLoggedIn, selectIsVerified } from 'store/modules/auth'
import VerifyEmailAlert from 'containers/VerifyEmailAlert'
import { MainItemTable } from 'components'
import messages from 'messages'

export class Dashboard extends Component {
  static propTypes = {
    history: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    isVerified: PropTypes.bool,
    sendVerifyEmail: PropTypes.func,
    intl: intlShape.isRequired,
  }

  gotoItemListingPage = item => {
    this.props.history.push(`/item/${item}`)
  }

  gotoItemAddPage = item => {
    const { isLoggedIn, isVerified, intl } = this.props

    if (!isLoggedIn) {
      this.props.history.push('auth')
      return
    }

    if (!isVerified) {
      swal({
        className: 'pe-swal-left',
        text: intl.formatMessage(messages.emailConfirm),
      }).then(res => {
        if (res) {
          this.props.sendVerifyEmail()
        }
      })
      return
    }

    this.props.history.push('/add-item')
  }

  render() {
    const { intl } = this.props
    const { formatMessage } = intl

    return (
      <div className="dashboard">
        <Row>
          <Col md={12}>
            <VerifyEmailAlert />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6} />
          <Col md={6}>
            <button className="pe-btn add-item-btn w-100 text-left p-2" style={{ fontSize: '1.2rem' }} onClick={this.gotoItemAddPage}>
              <IoMdAddCircleOutline className="mr-1" style={{ fontSize: '2.5rem', marginTop: -3 }} />
              {formatMessage(messages.addItemForEstimation)}
            </button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <MainItemTable onClick={this.gotoItemListingPage} />
          </Col>
        </Row>
      </div>
    )
  }
}

const selectors = createStructuredSelector({
  isLoggedIn: selectIsLoggedIn,
  isVerified: selectIsVerified,
})

const actions = {
  sendVerifyEmail,
}

export default compose(
  injectIntl,
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(Dashboard)
