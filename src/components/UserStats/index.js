import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import numeral from 'numeral'
import { Row, Col } from 'reactstrap'
import { getUserRank, getUserEmblem } from 'utils/common'

export default class UserStats extends Component {
  static propTypes = {
    user: PropTypes.shape({
      estimation_count: PropTypes.number,
      total_amount: PropTypes.number,
      accuracy: PropTypes.number,
    }),
    inline: PropTypes.bool,
  }

  static defaultProps = {
    inline: true,
  }

  render() {
    const { inline, user } = this.props
    const { estimation_count, total_amount, accuracy } = user
    const emblem = getUserEmblem(accuracy)

    return (
      <div className="user-stats px-4">
        <Row>
          <Col md={inline ? 6 : 12} className="py-4">
            <h3 className="mt-0 font-weight-bold text-uppercase">
              <FormattedMessage id="estify.stats" />
            </h3>
            <div className="d-flex justify-content-between">
              <span>
                <FormattedMessage id="estify.noEstimations" />
              </span>
              <span>{numeral(estimation_count).format('0,0')}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>
                <FormattedMessage id="estify.totalAmount" />
              </span>
              <span>
                <FormattedMessage id="estify.currency" /> {numeral(total_amount).format('0,0[.]00')}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span>
                <FormattedMessage id="estify.accuracy" />
              </span>
              <span>{numeral(accuracy).format('0[.]00')}%</span>
            </div>
          </Col>
          <Col md={inline ? 6 : 12} className="py-4">
            <h3 className="mt-0 font-weight-bold text-uppercase">
              <FormattedMessage id="estify.rank" />
            </h3>
            <FormattedMessage id={getUserRank(estimation_count)} />
            {emblem && <img className="user-stats-emblem" src={`../../assets/images/${emblem}-star.png`} alt="" />}
          </Col>
        </Row>
      </div>
    )
  }
}
