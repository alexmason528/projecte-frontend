import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'
import { MultipleImages } from 'components'
import { validate } from './validate'

class ImageForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onBack: PropTypes.func,
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form className="mt-3" onSubmit={handleSubmit}>
        <Row>
          <Col md={12} className="mb-3">
            <Field name="images" component={MultipleImages} validate={[validate]} />
          </Col>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <Button type="button" className="form-submit-btn px-4 py-2" onClick={this.props.onBack}>
                Back
              </Button>
              <Button className="form-submit-btn px-4 py-2">Publish</Button>
            </div>
          </Col>
        </Row>
      </form>
    )
  }
}

export default reduxForm({
  form: 'add-wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ImageForm)
