import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'reactstrap'
import { renderInput } from 'components/FormComponents'
import validate from './validate'

class LogInForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <h4 className="text-uppercase">LogIn</h4>
        <Field className="form-input" name="username" placeholder="Username" component={renderInput} />
        <Field className="form-input" name="password" type="password" placeholder="Password" component={renderInput} />
        <Button className="form-submit-btn w-100">Log In</Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'logInForm',
  validate,
})(LogInForm)
