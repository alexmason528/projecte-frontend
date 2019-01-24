import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { injectIntl, intlShape } from 'react-intl'
import cx from 'classnames'
import { omit, pick, startCase } from 'lodash'
import swal from 'sweetalert'
import { Alert, Row, Col } from 'reactstrap'
import { itemAdd, itemUpdate, selectItemStatus, selectItemError, ITEM_ADD, ITEM_UPDATE } from 'store/modules/item'
import { categoryFetch, selectCategories } from 'store/modules/category'
import { getChangedFields } from 'utils/common'
import { successAction } from 'utils/state-helpers'
import messages from 'messages'
import WizardForm from './Form'

class ItemWizard extends Component {
  static propTypes = {
    item: PropTypes.object,
    type: PropTypes.string,
    categories: PropTypes.array,
    status: PropTypes.string,
    error: PropTypes.string,
    itemAdd: PropTypes.func,
    itemUpdate: PropTypes.func,
    categoryFetch: PropTypes.func,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    editing: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      page: 1,
    }
  }

  componentWillMount() {
    const { type } = this.props

    this.props.categoryFetch(type)
  }

  componentWillReceiveProps(nextProps) {
    const { status } = this.props

    if (status === ITEM_ADD && nextProps.status !== status) {
      const success = nextProps.status === successAction(ITEM_ADD)

      swal({ className: 'pe-swal', text: success ? 'Successfully added your item.' : 'Failed to add your item.' }).then(() => {
        success && this.props.history.push('/me/listings')
      })
    }

    if (status === ITEM_UPDATE && nextProps.status !== status) {
      const success = nextProps.status === successAction(ITEM_UPDATE)

      swal({ className: 'pe-swal', text: success ? 'Successfully updated your item.' : 'Failed to updated your item.' }).then(() => {
        success && this.props.history.push('/me/listings')
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

  get editing() {
    return !!this.props.item
  }

  handleSubmit = values => {
    const { type, item } = this.props

    if (this.submitting) {
      return
    }

    const facts = omit(values, ['id', 'name', 'details', 'category', 'images', 'slug'])
    const parsed = pick(values, ['name', 'details', 'category', 'images'])
    const data = { ...parsed, facts }

    if (!this.editing) {
      this.props.itemAdd({ type, data })
    } else {
      this.props.itemUpdate({ type, slug: item.slug, data: getChangedFields(item, data) })
    }
  }

  render() {
    const { item, type, categories, error, intl } = this.props
    const { page } = this.state

    if (categories.length === 0) {
      return null
    }

    const { formatMessage } = intl

    return (
      <div className="item-wizard w-75 mx-auto">
        <Row>
          {error && (
            <Col md={12}>
              <Alert color="danger">{error}</Alert>
            </Col>
          )}
          <Col md={12}>
            <h4 className="mt-0 mb-3 text-uppercase">
              {this.editing ? 'Edit' : 'Add'} {startCase(type)}
            </h4>
          </Col>
          <Col md={12}>
            <div className="wizard-nav d-flex justify-content-center">
              <div className={cx('wizard-nav-btn mr-3', { active: page === 1 })} onClick={this.gotoFirstPage}>
                <div className="nav-order mr-3">1</div>
                Item Details
              </div>
              <div className={cx('wizard-nav-btn', { active: page === 2 })} onClick={this.gotoSecondPage}>
                <div className="nav-order mr-3">2</div>
                {formatMessage(messages.addImages)}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mt-3">
            <WizardForm
              onSubmit={this.handleSubmit}
              item={item}
              type={type}
              categories={categories}
              page={page}
              onBack={this.gotoFirstPage}
              onNext={this.gotoSecondPage}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

const selectors = createStructuredSelector({
  categories: selectCategories,
  status: selectItemStatus,
  error: selectItemError,
})

const actions = {
  itemAdd,
  itemUpdate,
  categoryFetch,
}

export default compose(
  injectIntl,
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(ItemWizard)
