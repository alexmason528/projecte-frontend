import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Form } from 'reactstrap'
import { selectUserData } from 'store/modules/auth'
import { LoaderButton, Input, PhotoField } from 'components'
import validate from './validate'

class ProfileForm extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    handleSubmit: PropTypes.func,
  }

  render() {
    const { loading, handleSubmit } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={7} lg={9}>
            <Row>
              <Col className="col-12 mb-3">
                <Field className="form-input" name="username" label="Username" component={Input} />
              </Col>
              <Col className="col-12 mb-3">
                <Field className="form-input" name="email" label="Email" component={Input} />
              </Col>
              <Col className="col-12 mb-3">
                <Field className="form-input" name="password" label="Password" type="password" placeholder="Password" component={Input} />
              </Col>
              <Col className="col-12 mb-3">
                <Field
                  className="form-input"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  component={Input}
                />
              </Col>
            </Row>
          </Col>
          <Col md={5} lg={3}>
            <Field name="photo" component={PhotoField} />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right mt-3">
            <LoaderButton className="form-submit-btn" loading={loading}>
              Update
            </LoaderButton>
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
    enableReinitialize: true,
    validate,
  }),
)(ProfileForm)
