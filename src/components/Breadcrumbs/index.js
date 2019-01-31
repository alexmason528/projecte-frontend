import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { Breadcrumb as RBreadcrumb, BreadcrumbItem as RBreadcrumbItem } from 'reactstrap'
import { find, findIndex, get } from 'lodash'
import { selectLocale } from 'store/modules/auth'
import { selectCategories } from 'store/modules/category'

export class Breadcrumbs extends Component {
  static propTypes = {
    locale: PropTypes.string,
    categories: PropTypes.array,
    path: PropTypes.string,
    history: PropTypes.object,
    listClassName: PropTypes.string,
  }

  getCrumbs = () => {
    const { locale, path, categories } = this.props

    return path.split('.').map(seg => {
      const category = find(categories, { slug: seg })

      return {
        slug: seg,
        id: get(category, 'id'),
        name: get(category, ['translation', locale]) || get(category, 'name'),
      }
    })
  }

  handleClick = slug => {
    const { categories } = this.props
    const crumbs = this.getCrumbs()

    const ind = findIndex(crumbs, { slug })

    if (ind === 0) {
      this.props.history.push(`/item/${slug}`)
      return
    }

    const type = get(crumbs, [0, 'slug'])
    const id = get(find(categories, { slug }), 'id')
    id && this.props.history.push(`/item/${type}?cid=${id}`)
  }

  render() {
    const { listClassName } = this.props
    const crumbs = this.getCrumbs()

    return (
      <RBreadcrumb listClassName={listClassName}>
        {crumbs.map(({ slug, name }, ind) => (
          <RBreadcrumbItem className="c-pointer" key={ind} onClick={() => this.handleClick(slug)}>
            <span className="text-uppercase">{name}</span>
          </RBreadcrumbItem>
        ))}
      </RBreadcrumb>
    )
  }
}

const selectors = createStructuredSelector({
  locale: selectLocale,
  categories: selectCategories,
})

export default compose(
  withRouter,
  connect(selectors),
)(Breadcrumbs)
