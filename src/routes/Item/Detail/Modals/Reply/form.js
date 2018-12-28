import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Row, Col, Form } from 'reactstrap'
import { Input } from 'components'
import validate from './validate'

const ReplyForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={12}>
        <h5 className="my-0 text-uppercase">Reply</h5>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col md={12} className="d-flex align-items-start">
        <div className="w-100 mr-2">
          <Field
            name="content"
            type="textarea"
            className="w-100 resize-none border-0 p-2"
            placeholder="Write comment..."
            component={Input}
          />
        </div>
        <Button className="form-submit-btn white">OK</Button>
      </Col>
    </Row>
  </Form>
)

ReplyForm.propTypes = {
  handleSubmit: PropTypes.func,
}

export default reduxForm({
  form: 'replyForm',
  validate,
})(ReplyForm)
