import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import numeral from 'numeral'
import { API_BASE_URL } from 'config/base'
import { getEstimation } from 'utils/common'

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      images: PropTypes.array,
      estimations: PropTypes.array,
      comments: PropTypes.array,
    }),
    onClick: PropTypes.func,
  }

  render() {
    const { id, name, images, estimations, comments } = this.props.item

    return (
      <div key={id} className="item d-flex w-100 mb-4">
        {images.length > 0 ? (
          <div
            className="item-thumb"
            style={{ background: `url(${API_BASE_URL}${images[0].obj})` }}
            onClick={() => this.props.onClick(id)}
          />
        ) : (
          <div className="item-thumb" onClick={() => this.props.onClick(id)} />
        )}
        <div className="item-info d-flex flex-column w-100 ml-4">
          <h4 className="item-name mt-0 mb-3 text-uppercase">{name}</h4>
          <div className="item-meta pe-box">
            <Row className="font-weight-bold">
              <Col md={6}>
                <h3 className="m-0">Estimation</h3>
              </Col>
              <Col md={6} className="text-right">
                <h3 className="m-0">€ {numeral(getEstimation(estimations)).format('0,0[.]00')}</h3>
              </Col>
            </Row>
            <Row>
              <Col md={6}>Estimations: {numeral(estimations.length).format('0,0')}</Col>
              <Col md={6} className="text-right">
                Comments: {numeral(comments.length).format('0,0')}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}