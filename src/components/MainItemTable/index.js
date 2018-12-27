import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import { startCase } from 'lodash'
import { MAIN_ITEM_TYPES } from 'config/base'

export default class MainItemTable extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
  }

  render() {
    const { className, onClick } = this.props

    return (
      <Row className={className}>
        {MAIN_ITEM_TYPES.map(item => (
          <Col key={item} md={6} className="mb-4" onClick={() => onClick(item)}>
            <button className="pe-btn item-btn w-100">
              <img src={`../../assets/images/${item}.png`} className="mr-4" alt="" />
              {startCase(item)}
            </button>
          </Col>
        ))}
      </Row>
    )
  }
}
