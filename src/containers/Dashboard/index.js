import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import VerifyEmailAlert from 'containers/VerifyEmailAlert'

export class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <VerifyEmailAlert />
          </Col>
          <Col md={12}>
            <h3>Dashboard</h3>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Dashboard
