import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { getUserPhotoUrl, getUserEmblem } from 'utils/common'

export class UserDetail extends Component {
  static propTypes = {
    user: PropTypes.object,
    history: PropTypes.object,
    isLister: PropTypes.bool,
  }

  static defaultProps = {
    isLister: false,
  }

  gotoUserInfoPage = () => {
    const { id } = this.props.user

    this.props.history.push(`/user/${id}`)
  }

  render() {
    const { isLister, user } = this.props
    const { accuracy, photo, username } = user

    const emblem = getUserEmblem(accuracy)

    return (
      <div className="user-detail position-relative d-flex align-items-center c-pointer" onClick={this.gotoUserInfoPage}>
        <img src={getUserPhotoUrl(photo)} style={{ width: 30, height: 30 }} alt="" />
        {isLister ? (
          <div className="text-none font-weight-normal ml-2" style={{ fontSize: '1rem' }}>
            {username}
          </div>
        ) : (
          <h4 className="item-comment__name my-0 ml-2">{username}</h4>
        )}
        {emblem && <img className="ml-2 -mt-1" src={`../../assets/images/${emblem}-star.png`} style={{ width: 20, height: 20 }} alt="" />}
      </div>
    )
  }
}

export default withRouter(UserDetail)
