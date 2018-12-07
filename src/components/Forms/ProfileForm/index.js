import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Button, Form } from 'reactstrap'
import { selectUserData } from 'store/modules/auth'
import { renderInput } from 'components/FormComponents'
import validate from './validate'

class ProfileForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8} sm={12}>
            <Row>
              <Col md={12} className="mb-3">
                <Field className="form-input" name="username" label="Username" component={renderInput} />
              </Col>
              <Col md={12} className="mb-3">
                <Field className="form-input" name="email" label="Email" component={renderInput} />
              </Col>
              <Col md={12} className="mb-3">
                <Field className="form-input" name="password" label="Password" type="password" placeholder="Password" component={renderInput} />
              </Col>
              <Col md={12}>
                <Field
                  className="form-input"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  component={renderInput}
                />
              </Col>
            </Row>
          </Col>
          <Col md={3} sm={12} className="ml-auto">
            <div className="user-photo mb-3" />
            <Button type="button" className="form-submit-btn w-100">
              Upload new photo
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right mt-3">
            <Button className="form-submit-btn">Update</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

const selectors = state => ({ initialValues: { ...selectUserData(state) } })

export default compose(
  connect(selectors),
  reduxForm({
    form: 'ProfileForm',
    validate,
  }),
)(ProfileForm)
