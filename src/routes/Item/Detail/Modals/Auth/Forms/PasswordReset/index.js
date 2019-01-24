import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { injectIntl, intlShape } from 'react-intl'
import { Field, reduxForm } from 'redux-form'
import { Button, Row, Col, Form } from 'reactstrap'
import { LoaderButton, Input } from 'components'
import messages from 'messages'
import validate from './validate'

const PasswordResetForm = ({ loading, intl, handleSubmit, onChangeFormType }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={12}>
        <h4 className="my-0 text-uppercase font-weight-bold">Password Reset</h4>
      </Col>
      <Col md={12} className="mt-3">
        <Field name="email" placeholder={intl.formatMessage(messages.email)} component={Input} />
      </Col>
      <Col md={12} className="mt-3 text-right">
        <LoaderButton className="form-submit-btn white" loading={loading}>
          Send
        </LoaderButton>
      </Col>
      <Col md={12} className="mt-4 text-center" style={{ fontSize: '1.2rem' }}>
        Already have account?{' '}
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

PasswordResetForm.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onChangeFormType: PropTypes.func,
  intl: intlShape.isRequired,
}

export default compose(
  injectIntl,
  reduxForm({
    form: 'PasswordResetForm',
    validate,
  }),
)(PasswordResetForm)
