import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { Breadcrumb as RBreadcrumb, BreadcrumbItem as RBreadcrumbItem } from 'reactstrap'
import { get, upperCase, find, slice } from 'lodash'
import { selectCategories } from 'store/modules/category'

export class Breadcrumbs extends Component {
  static propTypes = {
    categories: PropTypes.array,
    path: PropTypes.string,
    history: PropTypes.object,
    listClassName: PropTypes.string,
  }

  getCrumbs = () => this.props.path.split('.')

  handleClick = crumb => {
    const { categories } = this.props
    const crumbs = this.getCrumbs()

    const ind = crumbs.indexOf(crumb)

    if (ind === 0) {
      this.props.history.push(`/item/${crumb}`)
      return
    }

    const path = slice(crumbs, 0, ind + 1).join('.')
    const id = get(find(categories, { path }), 'id')

    id && this.props.history.push(`/item/${crumbs[0]}?cid=${id}`)
  }

  render() {
    const { listClassName } = this.props
    const crumbs = this.getCrumbs()

    return (
      <RBreadcrumb listClassName={listClassName}>
        {crumbs.map((crumb, ind) => (
          <RBreadcrumbItem className="c-pointer" key={ind} onClick={() => this.handleClick(crumb)}>
            {upperCase(crumb)}
          </RBreadcrumbItem>
        ))}
      </RBreadcrumb>
    )
  }
}

const selectors = createStructuredSelector({
  categories: selectCategories,
})

export default compose(
  withRouter,
  connect(selectors),
)(Breadcrumbs)
