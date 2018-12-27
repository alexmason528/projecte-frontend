import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import cx from 'classnames'
import { forEach, keys, omit, pick, startCase } from 'lodash'
import swal from 'sweetalert'
import { Alert, Row, Col } from 'reactstrap'
import { MAIN_ITEM_TYPES } from 'config/base'
import { itemAdd, selectItemStatus, selectItemError, ITEM_ADD } from 'store/modules/item'
import { successAction } from 'utils/state-helpers'
import DetailForm from './DetailForm/'
import ImageForm from './ImageForm/'

class AddWizard extends Component {
  static propTypes = {
    type: PropTypes.oneOf(MAIN_ITEM_TYPES),
    categories: PropTypes.array,
    status: PropTypes.string,
    error: PropTypes.string,
    itemAdd: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      page: 1,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { status, type } = this.props

    if (status === ITEM_ADD && nextProps.status !== status) {
      const success = nextProps.status === successAction(ITEM_ADD)

      swal({
        icon: success ? 'success' : 'error',
        text: success ? 'Successfully added your item.' : 'Failed to add your item.',
      }).then(() => {
        success && this.props.history.push(`/item/${type}`)
      })
    }
  }

  gotoFirstPage = () => {
    if (!this.submitting) {
      this.setState({ page: 1 })
    }
  }

  gotoSecondPage = () => {
    if (!this.submitting) {
      this.setState({ page: 2 })
    }
  }

  get submitting() {
    const { status } = this.props

    return status === ITEM_ADD
  }

  handleSubmit = values => {
    const { type } = this.props

    if (this.submitting) {
      return
    }

    const parsed = pick(values, ['name', 'details', 'category'])

    const formData = new FormData()
    forEach(keys(parsed), key => {
      formData.append(key, parsed[key])
    })

    forEach(values.images, image => {
      formData.append('images', image.obj)
      formData.append('descriptions', image.description)
    })

    const facts = omit(values, ['name', 'details', 'category', 'images'])
    formData.append('facts', JSON.stringify(facts))

    this.props.itemAdd({ type, data: formData })
  }

  render() {
    const { type, categories, error } = this.props
    const { page } = this.state

    return (
      <div className="add-wizard w-75 mx-auto">
        <Row>
          {error && (
            <Col md={12}>
              <Alert color="danger">{error}</Alert>
            </Col>
          )}
          <Col md={12}>
            <h4 className="mt-0 mb-1 text-uppercase">Add {startCase(type)}</h4>
          </Col>
          <Col md={12}>
            <div className="wizard-nav d-flex justify-content-center">
              <div className={cx('wizard-nav-btn mr-5', { active: page === 1 })} onClick={this.gotoFirstPage}>
                <div className="nav-order mr-3">1</div>
                Item Details
              </div>
              <div className={cx('wizard-nav-btn', { active: page === 2 })} onClick={this.gotoSecondPage}>
                <div className="nav-order mr-3">2</div>
                Add images
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mt-3">
            {page === 1 && <DetailForm type={type} categories={categories} onSubmit={this.gotoSecondPage} />}
            {page === 2 && <ImageForm onBack={this.gotoFirstPage} onSubmit={this.handleSubmit} />}
          </Col>
        </Row>
      </div>
    )
  }
}

const selectors = createStructuredSelector({
  status: selectItemStatus,
  error: selectItemError,
})

const actions = {
  itemAdd,
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(AddWizard)
