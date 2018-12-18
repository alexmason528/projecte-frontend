import React from 'react'
import { Row, Col } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import VerifyEmailAlert from 'containers/VerifyEmailAlert'
import { MainItemTable } from 'components'
import AddImage from 'assets/images/plus.png'

const Dashboard = ({ history }) => (
  <div>
    <Row>
      <Col md={12}>
        <VerifyEmailAlert />
      </Col>
    </Row>
    <Row className="mb-4">
      <Col md={6} />
      <Col md={6}>
        <button className="pe-btn add-item-btn" onClick={() => history.push('/add-item')}>
          <img src={AddImage} className="mr-3" alt="" />
          Add item for estimation
        </button>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <MainItemTable onClick={item => history.push(`/item/${item}`)} />
      </Col>
    </Row>
  </div>
)

export default withRouter(Dashboard)
