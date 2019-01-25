import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { injectIntl, intlShape } from 'react-intl'
import cx from 'classnames'
import { omit, pick } from 'lodash'
import swal from 'sweetalert'
import { Alert, Row, Col } from 'reactstrap'
import { selectLocale } from 'store/modules/auth'
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
    locale: PropTypes.string,
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
    this.props.categoryFetch()
  }

  componentWillReceiveProps(nextProps) {
    const { status, intl } = this.props
    const { formatMessage } = intl

    if (status === ITEM_ADD && nextProps.status !== status) {
      const success = nextProps.status === successAction(ITEM_ADD)

      swal({ className: 'pe-swal', text: formatMessage(success ? messages.addItemSuccess : messages.addItemFail) }).then(() => {
        success && this.props.history.push('/me/listings')
      })
    }

    if (status === ITEM_UPDATE && nextProps.status !== status) {
      const success = nextProps.status === successAction(ITEM_UPDATE)

      swal({ className: 'pe-swal', text: formatMessage(success ? messages.updateItemSuccess : messages.updateItemFail) }).then(() => {
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
    const { item, type, categories, locale, error, intl } = this.props
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
            <h4 className="mt-0 mb-3 text-uppercase">{formatMessage(this.editing ? messages.editItem : messages.addItem)}</h4>
          </Col>
          <Col md={12}>
            <div className="wizard-nav d-flex justify-content-center">
              <div className={cx('wizard-nav-btn mr-3', { active: page === 1 })} onClick={this.gotoFirstPage}>
                <div className="nav-order mr-3">1</div>
                {formatMessage(messages.itemDetails)}
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
              locale={locale}
              item={item}
              type={type}
              page={page}
              categories={categories}
              onSubmit={this.handleSubmit}
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
  locale: selectLocale,
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
