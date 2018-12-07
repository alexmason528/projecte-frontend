import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Container, Row, Col } from 'reactstrap'
import { selectUserData } from 'store/modules/auth'
import EmailVerifyAlert from 'components/EmailVerifyAlert'

export class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { user } = this.props

    return (
      <Container>
        <Row>
          <Col md={12}>
            <EmailVerifyAlert user={user} />
          </Col>
          <Col md={12}>
            <h3>Dashboard</h3>
          </Col>
        </Row>
      </Container>
    )
  }
}

const selectors = createStructuredSelector({
  user: selectUserData,
})

export default connect(selectors)(Dashboard)
