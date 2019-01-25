import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { get, find } from 'lodash'
import { getCategoryName } from 'utils/common'

export default class Dropdown extends Component {
  static propTypes = {
    input: PropTypes.object,
    categories: PropTypes.array,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    locale: PropTypes.string,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
  }

  state = {
    categoryId: null,
    subCategoryId: null,
  }

  componentWillMount() {
    this.intializeState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.intializeState(nextProps)
  }

  intializeState = props => {
    const { input, categories } = props

    if (input.value) {
      const category = find(categories, { id: input.value })

      if (category) {
        this.setState({ categoryId: input.value, subCategoryId: null })
        return
      } else {
        for (let category of categories) {
          const { children } = category
          const subCategory = find(children, { id: input.value })

          if (subCategory) {
            this.setState({ categoryId: category.id, subCategoryId: subCategory.id })
            return
          }
        }
      }
    }

    const categoryId = get(categories, [0, 'id'])
    const subCategoryId = get(categories, [0, 'children', 0, 'id'], null)

    this.setState({ categoryId, subCategoryId }, this.emitChange)
  }

  getCurrentCategoryName = categoryId => {
    const { categories, locale } = this.props

    return getCategoryName(find(categories, { id: categoryId }), locale)
  }

  getSubCategories = subCategoryId => {
    const { categories } = this.props

    return get(find(categories, { id: subCategoryId }), 'children')
  }

  handleCategoryChange = categoryId => {
    const { categories } = this.props
    const category = find(categories, { id: categoryId })
    const subCategoryId = get(category, ['children', 0, 'id'], null)

    this.setState({ categoryId, subCategoryId }, this.emitChange)
  }

  handleSubCategoryChange = subCategoryId => {
    this.setState({ subCategoryId }, this.emitChange)
  }

  emitChange = () => {
    const { input } = this.props
    const { categoryId, subCategoryId } = this.state

    input.onChange(subCategoryId || categoryId)
  }

  render() {
    const { categories, locale } = this.props
    const { categoryId, subCategoryId } = this.state

    const categoryName = this.getCurrentCategoryName(categoryId)
    const subCategories = this.getSubCategories(categoryId)
    const subCategoryName = get(find(subCategories, { id: subCategoryId }), 'name')

    return (
      <Row>
        <Col md={6}>
          <UncontrolledDropdown className="pe-dropdown category-dropdown" onChange={this.handleCategoryChange}>
            <DropdownToggle className="w-100 text-left py-2" caret>
              {categoryName}
            </DropdownToggle>
            <DropdownMenu className="w-100">
              {categories.map(category => (
                <DropdownItem key={category.id} onClick={() => this.handleCategoryChange(category.id)}>
                  {getCategoryName(category, locale)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>

        <Col md={6}>
          <UncontrolledDropdown className="pe-dropdown subcategory-dropdown">
            <DropdownToggle className="w-100 text-left py-2" caret>
              {subCategories && subCategories.length > 0 ? subCategoryName : <FormattedMessage id="estify.noSubCategories" />}
            </DropdownToggle>
            {subCategories && subCategories.length > 0 && (
              <DropdownMenu className="w-100">
                {subCategories.map(category => (
                  <DropdownItem key={category.id} onClick={() => this.handleSubCategoryChange(category.id)}>
                    {getCategoryName(category, locale)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </UncontrolledDropdown>
        </Col>
      </Row>
    )
  }
}
