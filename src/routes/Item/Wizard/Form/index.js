import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Container, Button } from 'reactstrap'
import { injectIntl, intlShape } from 'react-intl'
import { get, find, pick } from 'lodash'
import { Input, CategoryDropdown, TextArea, MultipleImages } from 'components'
import { REAL_ESTATE, AUTOMOBILE, ART, VALUABLE } from 'config/base'
import messages from 'messages'
import validate, { ImageValidator } from './validate'

class WizardForm extends Component {
  static propTypes = {
    type: PropTypes.string,
    categories: PropTypes.array,
    onNext: PropTypes.func,
    onBack: PropTypes.func,
    handleSubmit: PropTypes.func,
    intl: intlShape.isRequired,
  }

  renderRealStateFacts = () => {
    const { formatMessage } = this.props.intl

    return (
      <Fragment>
        <Row className="mb-2">
          <Col md={6}>
            <Field
              className="form-input"
              name="living_space"
              component={Input}
              label={formatMessage(messages.living_space)}
              labelSize={5}
              type="number"
            />
          </Col>
          <Col md={6}>
            <Field
              className="form-input"
              name="years_of_cons"
              component={Input}
              label={formatMessage(messages.years_of_cons)}
              labelSize={5}
              type="number"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              className="form-input"
              name="building_area"
              component={Input}
              label={formatMessage(messages.building_area)}
              labelSize={5}
              type="number"
            />
          </Col>
          <Col md={6}>
            <Field className="form-input" name="condition" component={Input} label={formatMessage(messages.condition)} labelSize={5} />
          </Col>
        </Row>
      </Fragment>
    )
  }

  renderArtFacts = () => {
    const { formatMessage } = this.props.intl

    return (
      <Fragment>
        <Row className="mb-2">
          <Col md={6}>
            <Field className="form-input" name="artist" component={Input} label={formatMessage(messages.artist)} labelSize={5} />
          </Col>
          <Col md={6}>
            <Field className="form-input" name="year" component={Input} label={formatMessage(messages.year)} labelSize={5} type="number" />
          </Col>
        </Row>
      </Fragment>
    )
  }

  renderAutomobileFacts = () => {
    const { formatMessage } = this.props.intl

    return (
      <Fragment>
        <Row className="mb-2">
          <Col md={6}>
            <Field className="form-input" name="year" component={Input} label={formatMessage(messages.year)} labelSize={4} type="number" />
          </Col>
          <Col md={6}>
            <Field className="form-input" name="fuel" component={Input} label={formatMessage(messages.fuel)} labelSize={4} />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={6}>
            <Field
              className="form-input"
              name="miles"
              component={Input}
              label={formatMessage(messages.miles)}
              labelSize={4}
              type="number"
            />
          </Col>
          <Col md={6}>
            <Field className="form-input" name="color" component={Input} label={formatMessage(messages.color)} labelSize={4} />
          </Col>
        </Row>
      </Fragment>
    )
  }

  renderValuableFacts = () => {
    const { formatMessage } = this.props.intl

    return (
      <Fragment>
        <Row className="mb-2">
          <Col md={6}>
            <Field
              className="form-input"
              name={formatMessage(messages.material)}
              component={Input}
              label={formatMessage(messages.material)}
              labelSize={5}
            />
          </Col>
          <Col md={6}>
            <Field
              className="form-input"
              name={formatMessage(messages.weight)}
              component={Input}
              label={formatMessage(messages.weight)}
              labelSize={5}
              type="number"
            />
          </Col>
        </Row>
      </Fragment>
    )
  }

  getCategoryPlaceholder = () => {
    const { type, intl } = this.props
    const { formatMessage } = intl

    if (type === ART || type === VALUABLE) {
      return formatMessage(messages.selectType)
    } else if (type === AUTOMOBILE) {
      return formatMessage(messages.selectBrand)
    } else if (type === REAL_ESTATE) {
      return formatMessage(messages.selectCategory)
    }

    return ''
  }

  getSubCategoryPlaceholder = () => {
    const { type, intl } = this.props
    const { formatMessage } = intl

    if (type === ART || type === VALUABLE) {
      return formatMessage(messages.selectSubType)
    } else if (type === AUTOMOBILE) {
      return formatMessage(messages.selectType)
    } else if (type === REAL_ESTATE) {
      return formatMessage(messages.selectRegion)
    }

    return ''
  }

  handleNext = () => {
    this.props.onNext()
  }

  get parsedCategories() {
    const { type, categories } = this.props

    const currentId = get(find(categories, { slug: type }), 'id')

    return categories
      .filter(category => category.parent === currentId)
      .map(category => ({
        ...category,
        children: [...categories.filter(elem => elem.parent === category.id)],
      }))
  }

  render() {
    const { page, type, intl } = this.props
    const { formatMessage } = intl

    return (
      <form onSubmit={this.props.handleSubmit}>
        <Row style={{ display: page === 1 ? 'block' : 'none' }}>
          <Col md={12} className="mb-3">
            <Field
              className="form-input"
              name="name"
              type="text"
              component={Input}
              label={intl.formatMessage(messages.name)}
              labelSize={2}
            />
          </Col>
          <Col md={12} className="mb-3">
            <Field name="category" component={CategoryDropdown} categories={this.parsedCategories} />
          </Col>
          <Col md={12} className="mb-3">
            <Container className="pe-box p-3">
              <Row className="mb-2">
                <Col md={12}>
                  <h3 className="text-uppercase m-0 font-weight-bold">{intl.formatMessage(messages.facts)}</h3>
                </Col>
              </Row>
              {type === REAL_ESTATE && this.renderRealStateFacts()}
              {type === ART && this.renderArtFacts()}
              {type === AUTOMOBILE && this.renderAutomobileFacts()}
              {type === VALUABLE && this.renderValuableFacts()}
            </Container>
          </Col>
          <Col md={12} className="mb-3">
            <div className="pe-box p-3">
              <h3 className="text-uppercase m-0 font-weight-bold mb-3">{formatMessage(messages.details)}</h3>
              <Field className="pe-quill bg-white color-black" name="details" component={TextArea} />
            </div>
          </Col>
          <Col md={12} className="text-right">
            <Button type="button" className="form-submit-btn px-4 py-2" onClick={this.handleNext}>
              {formatMessage(messages.next)}
            </Button>
          </Col>
        </Row>
        <Row style={{ display: page === 2 ? 'block' : 'none' }}>
          <Col md={12} className="mb-3">
            <Field name="images" component={MultipleImages} validate={[ImageValidator]} />
          </Col>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <Button type="button" className="form-submit-btn px-4 py-2" onClick={this.props.onBack}>
                {formatMessage(messages.back)}
              </Button>
              <Button className="form-submit-btn px-4 py-2">{formatMessage(messages.publish)}</Button>
            </div>
          </Col>
        </Row>
      </form>
    )
  }
}

const selectors = (state, props) => {
  if (!props.item) {
    return props
  }

  const { category, facts, ...itemData } = pick(props.item, ['id', 'name', 'images', 'category', 'details', 'facts'])

  return { ...props, initialValues: { category: category.id, ...facts, ...itemData } }
}

export default compose(
  injectIntl,
  connect(selectors),
  reduxForm({
    form: 'item-wizard',
    validate,
  }),
)(WizardForm)
