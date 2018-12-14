import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import { startCase } from 'lodash'
import { MAIN_CATEGORIES } from 'config/base'

export default class MainCategory extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
  }

  render() {
    const { className, onClick } = this.props

    return (
      <Row className={className}>
        {MAIN_CATEGORIES.map(category => (
          <Col key={category} md={6} className="mb-4" onClick={() => onClick(category)}>
            <div className="pe-btn category-btn w-100">
              <img src={`../../assets/images/${category}.png`} className="mr-4" alt="" />
              {startCase(category)}
            </div>
          </Col>
        ))}
      </Row>
    )
  }
}
