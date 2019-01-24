import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Form } from 'reactstrap'
import { injectIntl, intlShape } from 'react-intl'
import { LoaderButton, Input, TextArea } from 'components'
import messages from 'messages'
import validate from './validate'

const EstimationForm = ({ loading, intl, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={12} className="d-flex justify-content-between">
        <h5 className="my-0 text-uppercase">{intl.formatMessage(messages.giveEstimate)}</h5>
        <div className="w-auto position-relative">
          <Field className="line-height-1 p-2 pl-4" name="value" component={Input} type="number" />
          <span className="form-input__prefix">{intl.formatMessage(messages.currency)}</span>
        </div>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col md={12} className="d-flex align-items-end">
        <div className="w-100 mr-2">
          <Field
            name="comment"
            className="pe-quill bg-white color-black"
            placeholder={`${intl.formatMessage(messages.ok)}...`}
            component={TextArea}
          />
        </div>
        <LoaderButton className="form-submit-btn white" loading={loading}>
          {intl.formatMessage(messages.ok)}
        </LoaderButton>
      </Col>
    </Row>
  </Form>
)

EstimationForm.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  intl: intlShape.isRequired,
}

export default compose(
  injectIntl,
  reduxForm({
    form: 'estimationForm',
    validate,
  }),
)(EstimationForm)
