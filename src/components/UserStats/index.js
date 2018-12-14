import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

export default class UserStats extends Component {
  render() {
    return (
      <Container className="user-stats px-4">
        <Row>
          <Col md={6} className="py-4">
            <h3 className="mt-0 font-weight-bold">STATS</h3>
            <div className="d-flex justify-content-between">
              <span>No estimations</span>
              <span>4.332</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Total amount</span>
              <span>$1.323.010</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Accuracy</span>
              <span>7.5%</span>
            </div>
          </Col>
          <Col md={6} className="py-4">
            <h3 className="mt-0 font-weight-bold">RANK</h3>
            Bronze Rater
            <img className="user-stats-star" src="../../assets/images/bronze-star.png" alt="bronze-star" />
          </Col>
        </Row>
      </Container>
    )
  }
}
