import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { Alert } from 'reactstrap'
import { categoryFetch, selectCategories, selectCategoryStatus, selectCategoryError, CATEGORY_FETCH } from 'store/modules/category'
import { MAIN_ITEMS } from 'config/base'
import AddWizard from './AddWizard'

class ItemAddPage extends Component {
  static propTypes = {
    name: PropTypes.oneOf(MAIN_ITEMS),
    categories: PropTypes.array,
    status: PropTypes.string,
    error: PropTypes.string,
    categoryFetch: PropTypes.func,
    itemAdd: PropTypes.func,
  }

  componentWillMount() {
    const { name } = this.props

    if (MAIN_ITEMS.indexOf(name) === -1) {
      this.props.history.push('/error-404')
      return
    }

    this.props.categoryFetch(name)
  }

  render() {
    const { name, categories, status, error } = this.props

    if (status === CATEGORY_FETCH || categories.length === 0) {
      return null
    }

    if (error) {
      return <Alert color="danger">{error}></Alert>
    }

    return <AddWizard item={name} categories={categories} />
  }
}

const selectors = createStructuredSelector({
  categories: selectCategories,
  status: selectCategoryStatus,
  error: selectCategoryError,
})

const actions = {
  categoryFetch,
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(ItemAddPage)
