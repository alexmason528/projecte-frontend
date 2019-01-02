import React, { Component } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Row, Col } from 'reactstrap'
import { USER_RANK } from 'config/base'

export default class UserStats extends Component {
  static propTypes = {
    user: PropTypes.shape({
      estimation_count: PropTypes.number,
      total_amount: PropTypes.number,
      accuracy: PropTypes.number,
    }),
  }

  getUserRank() {
    const { estimation_count } = this.props.user

    for (let rank of USER_RANK) {
      const { min, max, value } = rank

      if ((min && min > estimation_count) || (max && max < estimation_count)) {
        continue
      }

      return value
    }
  }

  render() {
    const { estimation_count, total_amount, accuracy } = this.props.user
    return (
      <div className="user-stats px-4">
        <Row>
          <Col md={6} className="py-4">
            <h3 className="mt-0 font-weight-bold">STATS</h3>
            <div className="d-flex justify-content-between">
              <span>No estimations</span>
              <span>{numeral(estimation_count).format('0,0')}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Total amount</span>
              <span>€ {numeral(total_amount).format('0,0[.]00')}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Accuracy</span>
              <span>{accuracy}%</span>
            </div>
          </Col>
          <Col md={6} className="py-4">
            <h3 className="mt-0 font-weight-bold">RANK</h3>
            {this.getUserRank()}
            <img className="user-stats-star" src="../../assets/images/bronze-star.png" alt="bronze-star" />
          </Col>
        </Row>
      </div>
    )
  }
}
