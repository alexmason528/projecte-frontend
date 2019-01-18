import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Alert, Row, Col } from 'reactstrap'
import { keys, forEach, pick } from 'lodash'
import swal from 'sweetalert'
import { ProfileForm, UserStats } from 'components'
import { getProfile, updateProfile, selectUserData, selectAuthStatus, selectAuthError, AUTH_UPDATE_PROFILE } from 'store/modules/auth'
import { failAction } from 'utils/state-helpers'

export class Profile extends Component {
  static propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    user: PropTypes.object,
    getProfile: PropTypes.func,
    updateProfile: PropTypes.func,
  }

  componentWillMount() {
    this.props.getProfile()
  }

  componentWillReceiveProps(nextProps) {
    const { status } = this.props

    if (status === AUTH_UPDATE_PROFILE && nextProps.status !== status) {
      const success = nextProps.status !== failAction(AUTH_UPDATE_PROFILE)

      swal({ className: 'pe-swal', text: success ? 'Your profile is updated successfully.' : 'Failed to update your profile.' })
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

export default connect(
  selectors,
  actions,
)(Profile)
