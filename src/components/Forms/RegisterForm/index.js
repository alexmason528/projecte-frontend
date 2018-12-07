import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Row, Col } from 'reactstrap'
import { renderInput } from 'components/FormComponents'
import validate from './validate'

class RegisterForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <h4 className="text-uppercase">Register</h4>
          </Col>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="username" placeholder="Username" component={renderInput} />
          </Col>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="email" placeholder="Email" component={renderInput} />
          </Col>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="password" type="password" placeholder="Password" component={renderInput} />
          </Col>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="confirmPassword" type="password" placeholder="Confirm Password" component={renderInput} />
          </Col>
          <Col md={12} className="mb-3">
            <Button className="form-submit-btn w-100">Register</Button>
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
