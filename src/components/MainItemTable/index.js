import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Row, Col } from 'reactstrap'
import { selectLocale } from 'store/modules/auth'
import { categoryFetch, selectCategories } from 'store/modules/category'
import { getMainItemTypes, getCategoryName } from 'utils/common'

export class MainItemTable extends Component {
  static propTypes = {
    locale: PropTypes.string,
    categories: PropTypes.array,
    className: PropTypes.string,
    onClick: PropTypes.func,
    categoryFetch: PropTypes.func,
  }

  componentWillMount() {
    this.props.categoryFetch()
  }

  render() {
    const { categories, locale, className, onClick } = this.props

    const mainItemTypes = getMainItemTypes(categories)

    return (
      <Row className={className}>
        {mainItemTypes.map(category => (
          <Col key={category.id} md={6} className="mb-4" onClick={() => onClick(category.slug)}>
            <button className="pe-btn item-btn w-100">
              <img src={`../../assets/images/${category.slug}.png`} className="mr-4" alt="" />
              {getCategoryName(category, locale)}
            </button>
          </Col>
        ))}
      </Row>
    )
  }
}

const selectors = createStructuredSelector({
  locale: selectLocale,
  categories: selectCategories,
})

const actions = {
  categoryFetch,
}

export default connect(
  selectors,
  actions,
)(MainItemTable)
