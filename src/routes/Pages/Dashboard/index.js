import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import VerifyEmailAlert from 'containers/VerifyEmailAlert'
import { MainCategory } from 'components'
import AddImage from 'assets/images/plus.png'

const Dashboard = ({ history }) => (
  <Container>
    <Row className="mt-5">
      <Col md={12}>
        <VerifyEmailAlert />
      </Col>
    </Row>
    <Row className="mb-4">
      <Col md={6} />
      <Col md={6}>
        <div className="pe-btn add-item-btn" onClick={() => history.push('/add-item')}>
          <img src={AddImage} className="mr-3" alt="" />
          Add item for estimation
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <MainCategory onClick={category => history.push(category)} />
      </Col>
    </Row>
  </Container>
)

export default withRouter(Dashboard)
