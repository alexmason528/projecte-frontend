import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Row, Col } from 'reactstrap'
import numeral from 'numeral'
import { getUserInfo, selectUserInfo } from 'store/modules/auth'
import { getUserRank, getUserEmblem, getUserPhotoUrl } from 'utils/common'

export class PublicUserPage extends Component {
  static propTypes = {
    match: PropTypes.object,
    userInfo: PropTypes.object,
    getUserInfo: PropTypes.func,
  }

  componentWillMount() {
    const { match } = this.props

    this.props.getUserInfo(match.params.id)
  }

  render() {
    const { userInfo } = this.props

    if (!userInfo) {
      return null
    }

    const { accuracy, estimation_count, total_amount, username } = this.props.userInfo
    const emblem = getUserEmblem(accuracy)

    return (
      <div>
        <Row>
          <Col size={12}>
            <h1 className="my-0 color-primary">{username}</h1>
          </Col>
        </Row>
        <Row>
          <Col md={8} className="mt-3">
            <div className="pe-box user-stats d-flex justify-content-between flex-column h-100 p-4">
              <div>
                <h3 className="mt-0 mb-2 font-weight-bold">STATS</h3>
                <div className="d-flex justify-content-between">
                  <span>No estimations</span>
                  <span>{numeral(estimation_count).format('0,0')}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total amount</span>
                  <span>$ {numeral(total_amount).format('0,0[.]00')}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Accuracy</span>
                  <span>{numeral(accuracy).format('0[.]00')}%</span>
                </div>
              </div>
              <div className="mt-3 position-relative">
                <h3 className="mt-0 mb-2 font-weight-bold text-uppercase">Rank</h3>
                {getUserRank(estimation_count)}
                {emblem && <img className="user-stats-emblem" style={{ top: 0 }} src={`../../assets/images/${emblem}-star.png`} alt="" />}
              </div>
            </div>
          </Col>
          <Col md={4} className="mt-3">
            <img src={getUserPhotoUrl(userInfo.photo)} style={{ width: '100%' }} alt="" />
          </Col>
        </Row>
      </div>
    )
  }
}

const selectors = createStructuredSelector({
  userInfo: selectUserInfo,
})

const actions = {
  getUserInfo,
}

export default connect(
  selectors,
  actions,
)(PublicUserPage)
