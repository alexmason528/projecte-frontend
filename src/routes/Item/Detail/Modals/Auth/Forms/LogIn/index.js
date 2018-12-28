import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Row, Col, Form } from 'reactstrap'
import { LoaderButton, Input } from 'components'
import validate from './validate'

const LogInForm = ({ loading, handleSubmit, onChangeFormType }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={12}>
        <h4 className="my-0 text-uppercase font-weight-bold">LogIn</h4>
      </Col>
      <Col md={12} className="mt-3">
        <Field name="username" placeholder="Username" component={Input} />
      </Col>
      <Col md={12} className="mt-3">
        <Field name="password" type="password" placeholder="Password" component={Input} />
      </Col>
      <Col md={12} className="mt-3">
        <Button type="button" className="pe-btn-link deco-underline" onClick={() => onChangeFormType('passwordReset')}>
          Forgot Password?
        </Button>
      </Col>
      <Col md={12} className="mt-3 text-right">
        <LoaderButton className="form-submit-btn white" loading={loading}>
          LogIn
        </LoaderButton>
      </Col>
      <Col md={12} className="mt-4 text-center" style={{ fontSize: '1.2rem' }}>
        No Account?{' '}
        <Button
          type="button"
          className="pe-btn-link font-weight-bold"
          style={{ fontSize: 'inherit' }}
          onClick={() => onChangeFormType('register')}
        >
          Register
        </Button>
      </Col>
    </Row>
  </Form>
)

LogInForm.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onChangeFormType: PropTypes.func,
}

export default reduxForm({
  form: 'LogInForm',
  validate,
})(LogInForm)
