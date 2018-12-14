import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Alert, Row, Col } from 'reactstrap'
import { keys, forEach, pick } from 'lodash'
import swal from 'sweetalert'
import { ProfileForm, UserStats } from 'components'
import { updateProfile, selectUserData, selectAuthStatus, selectAuthError, UPDATE_PROFILE } from 'store/modules/auth'
import { failAction } from 'utils/state-helpers'

export class Profile extends Component {
  static propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    user: PropTypes.object,
    updateProfile: PropTypes.func,
  }

  componentWillReceiveProps(nextProps) {
    const { status } = this.props

    if (status === UPDATE_PROFILE && nextProps.status !== status) {
      const success = nextProps.status !== failAction(UPDATE_PROFILE)

      swal({
        icon: success ? 'success' : 'error',
        text: success ? 'Your profile is updated successfully.' : 'Failed to update your profile.',
      })
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
    const { error, status } = this.props
    const pending = status === UPDATE_PROFILE
    const failed = status === failAction(UPDATE_PROFILE)

    return (
      <Row>
        <Col sm={12}>
          {failed && error && <Alert color="danger">{error}</Alert>}
          <ProfileForm error={error} loading={pending} onSubmit={this.handleSubmit} />
        </Col>
        <Col sm={12} className="mt-4">
          <UserStats />
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
  updateProfile,
}

export default connect(
  selectors,
  actions,
)(Profile)
