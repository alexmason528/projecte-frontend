import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'reactstrap'
import { forOwn } from 'lodash'

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
        <Col key={key} className="col-6 mt-2">
          <Row>
            <Col className="col-6 font-weight-bold">
              <FormattedMessage id={`estify.${key}`} />
            </Col>
            <Col className="col-6 font-weight-light">
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
