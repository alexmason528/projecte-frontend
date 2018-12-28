import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Form } from 'reactstrap'
import { LoaderButton, Input } from 'components'
import validate from './validate'

const EstimationForm = ({ loading, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={12} className="d-flex justify-content-between">
        <h5 className="my-0 text-uppercase">Give estimate</h5>
        <div className="w-auto">
          <Field className="line-height-1 p-2" name="value" component={Input} type="number" />
        </div>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col md={12} className="d-flex align-items-end">
        <div className="w-100 mr-2">
          <Field name="comment" type="textarea" className="w-100 resize-none p-2" placeholder="Write comment..." component={Input} />
        </div>
        <LoaderButton className="form-submit-btn white" loading={loading}>
          OK
        </LoaderButton>
      </Col>
    </Row>
  </Form>
)

EstimationForm.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
}

export default reduxForm({
  form: 'estimationForm',
  validate,
})(EstimationForm)
