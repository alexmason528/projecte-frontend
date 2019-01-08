import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { Alert } from 'reactstrap'
import { categoryFetch, selectCategories, selectCategoryStatus, selectCategoryError, CATEGORY_FETCH } from 'store/modules/category'
import { MAIN_ITEM_TYPES } from 'config/base'
import AddWizard from './AddWizard'

class ItemAddPage extends Component {
  static propTypes = {
    type: PropTypes.oneOf(MAIN_ITEM_TYPES),
    categories: PropTypes.array,
    status: PropTypes.string,
    error: PropTypes.string,
    categoryFetch: PropTypes.func,
    itemAdd: PropTypes.func,
    reset: PropTypes.func,
  }

  componentWillMount() {
    const { type } = this.props

    if (MAIN_ITEM_TYPES.indexOf(type) === -1) {
      this.props.history.push('/error-404')
      return
    }

    this.props.categoryFetch(type)
    this.props.reset('add-wizard')
  }

  render() {
    const { type, categories, status, error } = this.props

    if (status === CATEGORY_FETCH || categories.length === 0) {
      return null
    }

    if (error) {
      return <Alert color="danger">{error}></Alert>
    }

    return (
      <div className="item-add-page">
        <AddWizard type={type} categories={categories} />
      </div>
    )
  }
}

const selectors = createStructuredSelector({
  categories: selectCategories,
  status: selectCategoryStatus,
  error: selectCategoryError,
})

const actions = {
  categoryFetch,
  reset,
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(ItemAddPage)
