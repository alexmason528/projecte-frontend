import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import { forOwn, capitalize, replace } from 'lodash'

export default class ItemFact extends Component {
  static propTypes = {
    facts: PropTypes.object,
  }

  getUnit = key => {
    if (['building_area', 'living_space'].indexOf(key) !== -1) {
      return (
        <Fragment>
          m<sup>2</sup>
        </Fragment>
      )
    }

    return null
  }

  getDetails = () => {
    const { facts } = this.props

    let details = []

    forOwn(facts, (value, key) =>
      details.push(
        <Col key={key} md={6} className="mt-2">
          <Row>
            <Col md={6}>{capitalize(replace(key, /_/g, ' '))}</Col>
            <Col md={6}>
              {value} {this.getUnit(key)}
            </Col>
          </Row>
        </Col>,
      ),
    )

    return details
  }

  render() {
    const details = this.getDetails()

    return <Row>{details}</Row>
  }
}
