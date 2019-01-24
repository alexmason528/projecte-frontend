import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { injectIntl, intlShape } from 'react-intl'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Form } from 'reactstrap'
import { LoaderButton, TextArea } from 'components'
import messages from 'messages'
import validate from './validate'

const ReplyForm = ({ loading, intl, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={12}>
        <h5 className="my-0 text-uppercase">{intl.formatMessage(messages.reply)}</h5>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col md={12} className="d-flex align-items-start">
        <div className="w-100 mr-2">
          <Field
            name="content"
            className="pe-quill color-black bg-white"
            placeholder={`${intl.formatMessage(messages.writeComment)}...`}
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

ReplyForm.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  intl: intlShape.isRequired,
}

export default compose(
  injectIntl,
  reduxForm({
    form: 'replyForm',
    validate,
  }),
)(ReplyForm)
