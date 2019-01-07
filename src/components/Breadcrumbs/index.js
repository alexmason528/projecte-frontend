import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb as RBreadcrumb, BreadcrumbItem as RBreadcrumbItem } from 'reactstrap'
import { upperCase } from 'lodash'

export default class Breadcrumbs extends Component {
  static propTypes = {
    path: PropTypes.string,
  }

  getCrumbs = () => {
    const { path } = this.props

    return path.split('.').map(segment => segment.replace(/-/g, ' '))
  }

  render() {
    const { path, ...props } = this.props
    const crumbs = this.getCrumbs()

    return (
      <RBreadcrumb {...props}>
        {crumbs.map((crumb, ind) => (
          <RBreadcrumbItem key={ind}>{upperCase(crumb)}</RBreadcrumbItem>
        ))}
      </RBreadcrumb>
    )
  }
}
