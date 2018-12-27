import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { IoMdAddCircleOutline } from 'react-icons/io'
import VerifyEmailAlert from 'containers/VerifyEmailAlert'
import { MainItemTable } from 'components'

export class Dashboard extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  gotoItemListingPage = item => {
    this.props.history.push(`/item/${item}`)
  }

  gotoItemAddPage = item => {
    this.props.history.push('/add-item')
  }

  render() {
    return (
      <div className="dashboard">
        <Row>
          <Col md={12}>
            <VerifyEmailAlert />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6} />
          <Col md={6}>
            <button className="pe-btn add-item-btn" onClick={this.gotoItemAddPage}>
              <IoMdAddCircleOutline style={{ fontSize: '1.5rem', marginRight: 5, marginTop: -3 }} />
              Add item for estimation
            </button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <MainItemTable onClick={this.gotoItemListingPage} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Dashboard)
