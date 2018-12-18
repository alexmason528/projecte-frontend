import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Form, Row, Col } from 'reactstrap'
import { LoaderButton, Input } from 'components'
import validate from './validate'

class RegisterForm extends Component {
  static propTypes = {
    registering: PropTypes.bool,
    handleSubmit: PropTypes.func,
  }

  render() {
    const { registering, handleSubmit } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="username" placeholder="Username" component={Input} />
          </Col>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="email" placeholder="Email" component={Input} />
          </Col>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="password" type="password" placeholder="Password" component={Input} />
          </Col>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="confirmPassword" type="password" placeholder="Confirm Password" component={Input} />
          </Col>
          <Col md={12} className="mb-3">
            <LoaderButton className="form-submit-btn w-100" loading={registering}>
              Register
            </LoaderButton>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'registerForm',
  validate,
})(RegisterForm)
