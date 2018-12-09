import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Row, Col } from 'reactstrap'
import { renderInput } from 'components/FormComponents'
import validate from './validate'

class LogInForm extends Component {
  static propTypes = {
    loggingIn: PropTypes.bool,
    handleSubmit: PropTypes.func,
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="username" placeholder="Username" component={renderInput} />
          </Col>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="password" type="password" placeholder="Password" component={renderInput} />
          </Col>
          <Col md={12} className="mb-3">
            <Button className="form-submit-btn w-100">Log In</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'logInForm',
  validate,
})(LogInForm)
