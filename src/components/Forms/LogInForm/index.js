import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { injectIntl, intlShape } from 'react-intl'
import { Field, reduxForm } from 'redux-form'
import { Form, Row, Col } from 'reactstrap'
import { LoaderButton, Input } from 'components'
import messages from 'messages'
import validate from './validate'

class LogInForm extends Component {
  static propTypes = {
    loggingIn: PropTypes.bool,
    handleSubmit: PropTypes.func,
    intl: intlShape.isRequired,
  }

  render() {
    const { loggingIn, intl, handleSubmit } = this.props
    const { formatMessage } = intl

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="username" placeholder={formatMessage(messages.username)} component={Input} />
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
            <LoaderButton className="form-submit-btn w-100" loading={loggingIn}>
              {formatMessage(messages.logIn)}
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
    form: 'logInForm',
    validate,
  }),
)(LogInForm)
