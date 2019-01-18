import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'reactstrap'
import MediaQuery from 'react-responsive'
import { MdEdit } from 'react-icons/md'
import { IoIosTrash } from 'react-icons/io'
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
        <MediaQuery minDeviceWidth={768}>
          <Col className="col-4 pr-0" onClick={this.gotoItemDetailPage}>
            <div className="item-thumb" style={{ background: `url(${API_BASE_URL}${images[0].obj})` }} />
          </Col>
          <Col className="col-8">
            <Row>
              <Col className="col-12">
                <div className="d-flex align-items-center justify-content-between" onClick={this.gotoItemDetailPage}>
                  <h4 className="item-name my-0 text-uppercase c-pointer">{name}</h4>
                  {buttons !== 'none' && (
                    <div>
                      {buttons === 'all' && (
                        <Button className="pe-btn p-1" onClick={this.handleEdit}>
                          <MdEdit style={{ fontSize: '1.5rem' }} />
                        </Button>
                      )}
                      <Button className="pe-btn p-1 ml-1" onClick={this.handleDelete}>
                        <IoIosTrash style={{ fontSize: '1.5rem' }} />
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
              <Col className="col-12">
                <div className="item-meta pe-box px-3 py-4 mt-3">
                  <Row className="font-weight-bold">
                    <Col sm={12} md={6}>
                      <h3 className="m-0">Estimation</h3>
                    </Col>
                    <Col sm={12} md={6} className="text-right">
                      <h3 className="m-0">$ {numeral(getEstimation(estimations)).format('0,0[.]00')}</h3>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col xs={6}>Estimations: {numeral(estimations.length).format('0,0')}</Col>
                    <Col xs={6} className="text-right">
                      Comments: {numeral(comments_count).format('0,0')}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
        </MediaQuery>

        <MediaQuery maxDeviceWidth={767}>
          <Col className="col-12 d-flex align-items-center justify-content-between">
            <h4 className="item-name my-0 text-uppercase c-pointer" onClick={this.gotoItemDetailPage}>
              {name}
            </h4>
            <div className="d-flex align-items-center justify-content-between">
              {buttons !== 'none' && (
                <div>
                  {buttons === 'all' && (
                    <Button className="pe-btn p-1" onClick={this.handleEdit}>
                      <MdEdit style={{ fontSize: '1.5rem' }} />
                    </Button>
                  )}
                  <Button className="pe-btn p-1 ml-1" onClick={this.handleDelete}>
                    <IoIosTrash style={{ fontSize: '1.5rem' }} />
                  </Button>
                </div>
              )}
            </div>
          </Col>
          <Col className="col-12 mt-2" onClick={this.gotoItemDetailPage}>
            <div className="item-thumb" style={{ background: `url(${API_BASE_URL}${images[0].obj})`, height: 250 }} />
            <div className="item-meta pe-box pt-2 pr-3 pb-1 pl-5 font-weight-bold" style={{ position: 'absolute', right: 16, bottom: 20 }}>
              <h3 className="m-0 text-uppercase" style={{ fontSize: '1.2rem' }}>
                Estimation
                <br />$ {numeral(getEstimation(estimations)).format('0,0[.]00')}
              </h3>
            </div>
          </Col>
        </MediaQuery>
      </Row>
    )
  }
}
