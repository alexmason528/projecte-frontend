import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectIntl, intlShape } from 'react-intl'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Form } from 'reactstrap'
import { selectUserData } from 'store/modules/auth'
import { LoaderButton, Input, PhotoField } from 'components'
import messages from 'messages'
import validate from './validate'

class ProfileForm extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    handleSubmit: PropTypes.func,
    intl: intlShape.isRequired,
  }

  render() {
    const { loading, intl, handleSubmit } = this.props
    const { formatMessage } = intl

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={7} lg={9}>
            <Row>
              <Col className="col-12 mb-3">
                <Field className="form-input" name="username" label={formatMessage(messages.username)} component={Input} />
              </Col>
              <Col className="col-12 mb-3">
                <Field className="form-input" name="email" label={formatMessage(messages.email)} component={Input} />
              </Col>
              <Col className="col-12 mb-3">
                <Field
                  className="form-input"
                  name="password"
                  label={formatMessage(messages.password)}
                  type="password"
                  placeholder={formatMessage(messages.password)}
                  component={Input}
                />
              </Col>
              <Col className="col-12 mb-3">
                <Field
                  className="form-input"
                  name="confirmPassword"
                  label={formatMessage(messages.confirmPassword)}
                  type="password"
                  placeholder={formatMessage(messages.confirmPassword)}
                  component={Input}
                />
              </Col>
            </Row>
          </Col>
          <Col md={5} lg={3}>
            <Field name="photo" component={PhotoField} buttonTitle={formatMessage(messages.uploadNewPhoto)} />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right mt-3">
            <LoaderButton className="form-submit-btn" loading={loading}>
              {formatMessage(messages.update)}
            </LoaderButton>
          </Col>
        </Row>
      </Form>
    )
  }
}

const selectors = state => ({ initialValues: { ...selectUserData(state) } })

export default compose(
  injectIntl,
  connect(selectors),
  reduxForm({
    form: 'ProfileForm',
    enableReinitialize: true,
    validate,
  }),
)(ProfileForm)
