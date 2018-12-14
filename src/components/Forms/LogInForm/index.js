import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Form, Row, Col } from 'reactstrap'
import { LoaderButton, renderInput } from 'components'
import validate from './validate'

class LogInForm extends Component {
  static propTypes = {
    loggingIn: PropTypes.bool,
    handleSubmit: PropTypes.func,
  }

  render() {
    const { loggingIn, handleSubmit } = this.props

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
            <LoaderButton className="form-submit-btn w-100" loading={loggingIn}>
              Log In
            </LoaderButton>
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
