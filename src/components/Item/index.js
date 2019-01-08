import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import cx from 'classnames'
import numeral from 'numeral'
import { API_BASE_URL } from 'config/base'
import { getEstimation } from 'utils/common'

export default class Item extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    images: PropTypes.array,
    estimations: PropTypes.array,
    comments_count: PropTypes.number,
    category: PropTypes.object,
    buttons: PropTypes.string,
    onRedirect: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
  }

  static defaultProps = {
    buttons: 'none',
    onRedirect: () => {},
    onDelete: () => {},
    onEdit: () => {},
  }

  get type() {
    const { path } = this.props.category

    return path.indexOf('.') === -1 ? path : path.split('.')[0]
  }

  gotoItemDetailPage = () => {
    const { id } = this.props

    this.props.onRedirect(id, this.type)
  }

  handleEdit = () => {
    const { id } = this.props

    this.props.onEdit(id, this.type)
  }

  handleDelete = () => {
    const { id } = this.props

    this.props.onDelete(id, this.type)
  }

  render() {
    const { id, name, images, estimations, comments_count, buttons } = this.props

    return (
      <Row key={id} className="item mb-4">
        <Col sm={12} md={3} onClick={this.gotoItemDetailPage}>
          <div className="item-thumb" style={{ background: `url(${API_BASE_URL}${images[0].obj})` }} />
        </Col>
        <Col sm={12} md={9}>
          <div className="d-flex flex-column h-100">
            <h4 className="item-name mt-0 mb-3 text-uppercase c-pointer" onClick={this.gotoItemDetailPage}>
              {name}
            </h4>
            <Row className="m-0 flex-grow-1">
              <Col md={buttons !== 'none' ? 10 : 12} className="item-meta p-3 pe-box">
                <Row className="font-weight-bold">
                  <Col xs={6}>
                    <h3 className="m-0">Estimation</h3>
                  </Col>
                  <Col xs={6} className="text-right">
                    <h3 className="m-0">$ {numeral(getEstimation(estimations)).format('0,0[.]00')}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>Estimations: {numeral(estimations.length).format('0,0')}</Col>
                  <Col xs={6} className="text-right">
                    Comments: {numeral(comments_count).format('0,0')}
                  </Col>
                </Row>
              </Col>
              {buttons !== 'none' && (
                <Col md={2} className={cx('item-action pr-0', { 'justify-content-end': buttons === 'delete' })}>
                  {buttons === 'all' && (
                    <div className="pe-btn item-edit-btn" onClick={this.handleEdit}>
                      Edit
                    </div>
                  )}
                  <div className="pe-btn item-delete-btn" onClick={this.handleDelete}>
                    Delete
                  </div>
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    )
  }
}
