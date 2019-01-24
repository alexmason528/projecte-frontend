import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Alert, Row, Col } from 'reactstrap'
import { injectIntl, intlShape } from 'react-intl'
import { keys, forEach, pick } from 'lodash'
import swal from 'sweetalert'
import { ProfileForm, UserStats } from 'components'
import { getProfile, updateProfile, selectUserData, selectAuthStatus, selectAuthError, AUTH_UPDATE_PROFILE } from 'store/modules/auth'
import { failAction } from 'utils/state-helpers'
import messages from 'messages'

export class Profile extends Component {
  static propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    user: PropTypes.object,
    getProfile: PropTypes.func,
    updateProfile: PropTypes.func,
    intl: intlShape.isRequired,
  }

  componentWillMount() {
    this.props.getProfile()
  }

  componentWillReceiveProps(nextProps) {
    const { status, intl } = this.props
    const { formatMessage } = intl

    if (status === AUTH_UPDATE_PROFILE && nextProps.status !== status) {
      const success = nextProps.status !== failAction(AUTH_UPDATE_PROFILE)

      swal({ className: 'pe-swal', text: formatMessage(success ? messages.profileUpdateSuccess : messages.profileUpdateFail) })
    }
  }

  handleSubmit = values => {
    const { user, updateProfile } = this.props

    const formData = new FormData()

    const data = pick(values, ['username', 'email', 'password', 'photo'])

    forEach(keys(data), key => {
      if (data[key] && data[key] !== user[key]) {
        formData.append(key, data[key])
      }
    })

    updateProfile(formData)
  }

  render() {
    const { user, error, status } = this.props
    const pending = status === AUTH_UPDATE_PROFILE
    const failed = status === failAction(AUTH_UPDATE_PROFILE)

    return (
      <Row className="profile-page">
        <Col className="col-12">
          {failed && error && <Alert color="danger">{error}</Alert>}
          <ProfileForm error={error} loading={pending} onSubmit={this.handleSubmit} />
        </Col>
        <Col className="col-12 mt-4">
          <UserStats user={user} />
        </Col>
      </Row>
    )
  }
}

const selectors = createStructuredSelector({
  user: selectUserData,
  status: selectAuthStatus,
  error: selectAuthError,
})

const actions = {
  getProfile,
  updateProfile,
}

export default compose(
  injectIntl,
  connect(
    selectors,
    actions,
  ),
)(Profile)
