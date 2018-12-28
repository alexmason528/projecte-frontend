import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MdExpandLess, MdExpandMore, MdFirstPage, MdLastPage, MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Pagination from 'react-js-pagination'
import queryString from 'query-string'
import { keys } from 'lodash'
import { Item, Loader } from 'components'
import { itemList, clearItems, selectItemData, selectItemStatus, selectItemError, ITEM_LIST } from 'store/modules/item'
import { ORDERING_CONSTS, MAIN_ITEM_TYPES } from 'config/base'

class ItemListingPage extends Component {
  static propTypes = {
    type: PropTypes.oneOf(MAIN_ITEM_TYPES),
    itemData: PropTypes.shape({
      totalItemsCount: PropTypes.number,
      itemsCountPerPage: PropTypes.number,
      activePage: PropTypes.number,
      results: PropTypes.array,
    }),
    status: PropTypes.string,
    error: PropTypes.string,
    itemList: PropTypes.func,
    clearItems: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      search: undefined,
      ordering: undefined,
      page: 1,
    }
  }

  componentWillMount() {
    this.fetchData(this.props, true)
  }

  componentWillReceiveProps(nextProps) {
    const { search } = this.props.location
    if (search !== nextProps.location.search) {
      this.fetchData(nextProps)
    }
  }

  fetchData = (props, initial = false) => {
    const { location } = props
    const { search, ordering, page } = queryString.parse(location.search)

    if (initial) {
      this.props.clearItems()
      this.setState(Object.assign({ search, page }, keys(ORDERING_CONSTS).indexOf(ordering) !== -1 && { ordering }))
    }

    const { type } = props
    this.props.itemList({ type, params: { search, ordering, page } })
  }

  getDropdownToggleContent = () => {
    const { ordering } = this.state

    if (ordering && keys(ORDERING_CONSTS).indexOf(ordering) !== -1) {
      return ORDERING_CONSTS[ordering]
    }

    return 'Sort by'
  }

  changeLocation = () => {
    const { page, ordering, search } = this.state
    const { match } = this.props
    const queryParam = queryString.stringify({ page, ordering, search })

    const newUrl = `${match.url}?${queryParam}`

    this.props.history.push(newUrl)
  }

  handleSearchChange = evt => {
    if (evt.keyCode === 13) {
      const { value } = evt.target
      this.setState({ search: !value || value === '' ? undefined : value }, this.changeLocation)
    }
  }

  handlePageChange = page => {
    this.setState({ page }, this.changeLocation)
  }

  handleOrderingChange = ordering => {
    this.setState({ ordering: ordering === 'clear' ? undefined : ordering }, this.changeLocation)
  }

  handleItemClick = (id, type) => {
    this.props.history.push(`/item/${type}/${id}`)
  }

  render() {
    const { itemData, status } = this.props
    const { search } = this.state

    const { totalItemsCount, itemsCountPerPage, activePage } = itemData

    return (
      <Row className="item-list-page py-3">
        {status === ITEM_LIST && <Loader />}
        <Col md={9}>
          <div>
            {itemData.results.length > 0 && itemData.results.map(item => <Item key={item.id} {...item} onClick={this.handleItemClick} />)}
          </div>
          {totalItemsCount > 0 && (
            <div className="mt-3 text-right">
              <Pagination
                className="pe-pagination"
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                firstPageText={<MdFirstPage />}
                lastPageText={<MdLastPage />}
                prevPageText={<MdChevronLeft />}
                nextPageText={<MdChevronRight />}
                onChange={this.handlePageChange}
              />
            </div>
          )}
        </Col>
        <Col md={3} className="pl-0">
          <input placeholder="Search..." className="pe-input w-100" defaultValue={search} onKeyDown={this.handleSearchChange} />
          <UncontrolledDropdown className="pe-dropdown mt-2">
            <DropdownToggle className="w-100 text-left py-2" caret>
              {this.getDropdownToggleContent()}
            </DropdownToggle>
            <DropdownMenu className="w-100">
              <DropdownItem onClick={() => this.handleOrderingChange('price')}>
                Price
                <MdExpandLess />
              </DropdownItem>
              <DropdownItem onClick={() => this.handleOrderingChange('-price')}>
                Price
                <MdExpandMore />
              </DropdownItem>
              <DropdownItem onClick={() => this.handleOrderingChange('estimation')}>
                Estimations
                <MdExpandLess />
              </DropdownItem>
              <DropdownItem onClick={() => this.handleOrderingChange('-estimation')}>
                Estimations
                <MdExpandMore />
              </DropdownItem>
              <DropdownItem onClick={() => this.handleOrderingChange('-date')}>Most recent</DropdownItem>
              <DropdownItem onClick={() => this.handleOrderingChange('clear')}>Clear filter</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>
      </Row>
    )
  }
}

const selectors = createStructuredSelector({
  itemData: selectItemData,
  status: selectItemStatus,
  error: selectItemError,
})

const actions = {
  itemList,
  clearItems,
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(ItemListingPage)
