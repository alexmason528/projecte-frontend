import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logIn } from 'store/modules/auth'
import { Container, Row, Col } from 'reactstrap'
import LogInForm from 'components/Forms/LogInForm'
import RegisterForm from 'components/Forms/RegisterForm'

export class Auth extends Component {
  static propTypes = {
    logIn: PropTypes.func,
  }

  handleLogin = values => {
    this.props.logIn(values)
  }

  handleRegister = values => {}

  render() {
    return (
      <Container>
        <Row>
          <Col md={6} sm={12}>
            <LogInForm onSubmit={this.handleLogin} />
          </Col>
          <Col md={6} sm={12}>
            <RegisterForm onSubmit={this.handleRegister} />
          </Col>
        </Row>
      </Container>
    )
  }
}

const actions = {
  logIn,
}

export default connect(
  null,
  actions,
)(Auth)
