import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import EmailVerifyAlert from 'containers/EmailVerifyAlert'

export class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <EmailVerifyAlert />
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
