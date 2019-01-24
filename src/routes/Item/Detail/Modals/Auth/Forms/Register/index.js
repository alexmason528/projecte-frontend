import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Row, Col, Form } from 'reactstrap'
import { injectIntl, intlShape } from 'react-intl'
import { LoaderButton, Input } from 'components'
import messages from 'messages'
import validate from './validate'

const RegisterForm = ({ loading, intl, handleSubmit, onChangeFormType }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={12}>
        <h4 className="my-0 text-uppercase font-weight-bold">{intl.formatMessage(messages.register)}</h4>
      </Col>
      <Col md={12} className="mt-3">
        <Field name="username" placeholder={intl.formatMessage(messages.username)} component={Input} />
      </Col>
      <Col md={12} className="mt-3">
        <Field name="email" placeholder={intl.formatMessage(messages.email)} component={Input} />
      </Col>
      <Col md={12} className="mt-3">
        <Field name="password" placeholder={intl.formatMessage(messages.password)} type="password" component={Input} />
      </Col>
      <Col md={12} className="mt-3">
        <Field name="confirmPassword" placeholder={intl.formatMessage(messages.confirmPassword)} type="password" component={Input} />
      </Col>
      <Col md={12} className="mt-3">
        <Button type="button" className="pe-btn-link deco-underline" onClick={() => onChangeFormType('passwordReset')}>
          {intl.formatMessage(messages.forgotPassword)}
        </Button>
      </Col>
      <Col md={12} className="mt-3 text-right">
        <LoaderButton className="form-submit-btn white" loading={loading}>
          {intl.formatMessage(messages.register)}
        </LoaderButton>
      </Col>
      <Col md={12} className="mt-4 text-center" style={{ fontSize: '1.2rem' }}>
        {intl.formatMessage(messages.alreadyHaveAccount)}?{' '}
        <Button
          type="button"
          className="pe-btn-link font-weight-bold"
          style={{ fontSize: 'inherit' }}
          onClick={() => onChangeFormType('logIn')}
        >
          {intl.formatMessage(messages.logIn)}
        </Button>
      </Col>
    </Row>
  </Form>
)

RegisterForm.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onChangeFormType: PropTypes.func,
  intl: intlShape.isRequired,
}

export default compose(
  injectIntl,
  reduxForm({
    form: 'RegisterForm',
    validate,
  }),
)(RegisterForm)
