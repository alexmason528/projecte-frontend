import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { injectIntl, intlShape } from 'react-intl'
import { Field, reduxForm } from 'redux-form'
import { Form, Row, Col } from 'reactstrap'
import messages from 'messages'
import { LoaderButton, Input } from 'components'
import validate from './validate'

class RegisterForm extends Component {
  static propTypes = {
    registering: PropTypes.bool,
    handleSubmit: PropTypes.func,
    intl: intlShape.isRequired,
  }

  render() {
    const { registering, intl, handleSubmit } = this.props
    const { formatMessage } = intl

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="username" placeholder={formatMessage(messages.username)} component={Input} />
          </Col>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="email" placeholder={formatMessage(messages.email)} component={Input} />
          </Col>
          <Col md={12} className="mb-3">
            <Field
              className="form-input"
              name="password"
              type="password"
              placeholder={formatMessage(messages.password)}
              component={Input}
            />
          </Col>
          <Col md={12} className="mb-3">
            <Field
              className="form-input"
              name="confirmPassword"
              type="password"
              placeholder={formatMessage(messages.confirmPassword)}
              component={Input}
            />
          </Col>
          <Col md={12} className="mb-3">
            <LoaderButton className="form-submit-btn w-100" loading={registering}>
              {formatMessage(messages.register)}
            </LoaderButton>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default compose(
  injectIntl,
  reduxForm({
    form: 'registerForm',
    validate,
  }),
)(RegisterForm)
