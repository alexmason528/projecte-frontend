import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { MAIN_ITEMS } from 'config/base'
import { Field, reduxForm } from 'redux-form'
import { Container, Row, Col, Button } from 'reactstrap'
import { Input, CategoryDropdown } from 'components'
import { REAL_ESTATE, AUTOMOBILE, ART, VALUABLE } from 'config/base'
import validate from './validate'

class DetailForm extends Component {
  static propTypes = {
    item: PropTypes.oneOf(MAIN_ITEMS),
    categories: PropTypes.array,
    handleSubmit: PropTypes.func,
  }

  renderRealStateFacts = () => (
    <Fragment>
      <Row className="mb-2">
        <Col md={6}>
          <Field className="form-input" name="living_space" component={Input} label="living space" labelSize={5} type="number" />
        </Col>
        <Col md={6}>
          <Field className="form-input" name="years_of_cons" component={Input} label="years of cons." labelSize={5} type="number" />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Field className="form-input" name="building_area" component={Input} label="building area" labelSize={5} type="number" />
        </Col>
        <Col md={6}>
          <Field className="form-input" name="condition" component={Input} label="condition" labelSize={5} />
        </Col>
      </Row>
    </Fragment>
  )

  renderArtFacts = () => (
    <Fragment>
      <Row className="mb-2">
        <Col md={6}>
          <Field className="form-input" name="artist" component={Input} label="artis" labelSize={5} />
        </Col>
        <Col md={6}>
          <Field className="form-input" name="year" component={Input} label="year" labelSize={5} type="number" />
        </Col>
      </Row>
    </Fragment>
  )

  renderAutomobileFacts = () => (
    <Fragment>
      <Row className="mb-2">
        <Col md={6}>
          <Field className="form-input" name="year" component={Input} label="year" labelSize={4} type="number" />
        </Col>
        <Col md={6}>
          <Field className="form-input" name="fuel" component={Input} label="fuel" labelSize={4} />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={6}>
          <Field className="form-input" name="miles" component={Input} label="miles" labelSize={4} type="number" />
        </Col>
        <Col md={6}>
          <Field className="form-input" name="color" component={Input} label="color" labelSize={4} />
        </Col>
      </Row>
    </Fragment>
  )

  renderValuableFacts = () => (
    <Fragment>
      <Row className="mb-2">
        <Col md={6}>
          <Field className="form-input" name="material" component={Input} label="material" labelSize={5} />
        </Col>
        <Col md={6}>
          <Field className="form-input" name="weight" component={Input} label="weight" labelSize={5} type="number" />
        </Col>
      </Row>
    </Fragment>
  )

  getCategoryPlaceholder = () => {
    const { item } = this.props

    if (item === ART || item === VALUABLE) {
      return 'Select type'
    } else if (item === AUTOMOBILE) {
      return 'Select brand'
    } else if (item === REAL_ESTATE) {
      return 'Select category'
    }

    return ''
  }

  getSubCategoryPlaceholder = () => {
    const { item } = this.props

    if (item === ART || item === VALUABLE) {
      return 'Select sub-type'
    } else if (item === AUTOMOBILE) {
      return 'Select type'
    } else if (item === REAL_ESTATE) {
      return 'Select region'
    }

    return ''
  }

  render() {
    const { item, categories, handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={12} className="mb-3">
            <Field className="form-input" name="name" type="text" component={Input} label="NAME" labelSize={2} />
          </Col>
          <Col md={12} className="mb-3">
            <Field name="category" component={CategoryDropdown} categories={categories} />
          </Col>
          <Col md={12} className="mb-3">
            <Container className="wizard-box p-3">
              <Row className="mb-2">
                <Col md={12}>
                  <h3 className="text-uppercase m-0 font-weight-bold">Facts</h3>
                </Col>
              </Row>
              {item === REAL_ESTATE && this.renderRealStateFacts()}
              {item === ART && this.renderArtFacts()}
              {item === AUTOMOBILE && this.renderAutomobileFacts()}
              {item === VALUABLE && this.renderValuableFacts()}
            </Container>
          </Col>
          <Col md={12} className="mb-3">
            <div className="wizard-box p-3">
              <h3 className="text-uppercase m-0 font-weight-bold mb-3">Details</h3>
              <Field className="w-100 resize-none back-secondary p-2" type="textarea" name="details" component={Input} />
            </div>
          </Col>
          <Col md={12} className="text-right">
            <Button className="form-submit-btn px-4 py-2">Next</Button>
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
  validate,
})(DetailForm)
