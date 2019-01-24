import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Row, Col, Form } from 'reactstrap'
import { injectIntl, intlShape } from 'react-intl'
import { LoaderButton, Input } from 'components'
import messages from 'messages'
import validate from './validate'

const LogInForm = ({ loading, intl, handleSubmit, onChangeFormType }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={12}>
        <h4 className="my-0 text-uppercase font-weight-bold">{intl.formatMessage(messages.logIn)}</h4>
      </Col>
      <Col md={12} className="mt-3">
        <Field name="username" placeholder={intl.formatMessage(messages.username)} component={Input} />
      </Col>
      <Col md={12} className="mt-3">
        <Field name="password" type="password" placeholder={intl.formatMessage(messages.password)} component={Input} />
      </Col>
      <Col md={12} className="mt-3">
        <Button type="button" className="pe-btn-link deco-underline" onClick={() => onChangeFormType('passwordReset')}>
          {intl.formatMessage(messages.forgotPassword)}
        </Button>
      </Col>
      <Col md={12} className="mt-3 text-right">
        <LoaderButton className="form-submit-btn white" loading={loading}>
          {intl.formatMessage(messages.logIn)}
        </LoaderButton>
      </Col>
      <Col md={12} className="mt-4 text-center" style={{ fontSize: '1.2rem' }}>
        {intl.formatMessage(messages.noAccount)}?{' '}
        <Button
          type="button"
          className="pe-btn-link font-weight-bold"
          style={{ fontSize: 'inherit' }}
          onClick={() => onChangeFormType('register')}
        >
          {intl.formatMessage(messages.register)}
        </Button>
      </Col>
    </Row>
  </Form>
)

LogInForm.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onChangeFormType: PropTypes.func,
  intl: intlShape.isRequired,
}

export default compose(
  injectIntl,
  reduxForm({
    form: 'LogInForm',
    validate,
  }),
)(LogInForm)
