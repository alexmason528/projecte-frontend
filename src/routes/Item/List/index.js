import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { Row, Col } from 'reactstrap'
import Adsense from 'react-adsense'
import queryString from 'query-string'
import { find, findIndex } from 'lodash'
import { Breadcrumbs, Item, ItemFilter, Loader, Pagination, Desktop, TabletOrMobile } from 'components'
import { categoryFetch, selectCategories } from 'store/modules/category'
import { itemList, clearItems, selectItemData, selectItemStatus, selectItemError, ITEM_LIST } from 'store/modules/item'
import { ORDERING_CONSTS, MAIN_ITEM_TYPES } from 'config/base'
import { getItemListingPagePath } from 'utils/common'

class ItemListingPage extends Component {
  static propTypes = {
    type: PropTypes.oneOf(MAIN_ITEM_TYPES),
    itemData: PropTypes.shape({
      totalItemsCount: PropTypes.number,
      itemsCountPerPage: PropTypes.number,
      activePage: PropTypes.number,
      results: PropTypes.array,
    }),
    categories: PropTypes.array,
    status: PropTypes.string,
    error: PropTypes.string,
    itemList: PropTypes.func,
    clearItems: PropTypes.func,
    categoryFetch: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      cid: undefined,
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
    const { location, type } = props
    const { search, ordering, page, cid } = queryString.parse(location.search)

    if (initial) {
      this.props.categoryFetch(type)
      this.props.clearItems()
      this.setState(Object.assign({ search, page, cid }, findIndex(ORDERING_CONSTS, { id: ordering }) !== -1 && { ordering }))
    }

    this.props.itemList({ type, params: { search, ordering, page, cid } })
  }

  getDropdownToggleContent = () => {
    const { ordering } = this.state
    const current = find(ORDERING_CONSTS, { id: ordering })

    if (ordering && current) {
      return current.content
    }

    return 'Sort by'
  }

  changeLocation = () => {
    const { page, ordering, search, cid } = this.state
    const { match } = this.props
    const queryParam = queryString.stringify({ page, ordering, search, cid })

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

  handleOrderingChange = id => {
    this.setState({ ordering: id === 'clear' ? undefined : id }, this.changeLocation)
  }

  handleRedirect = (id, type) => {
    this.props.history.push(`/item/${type}/${id}`)
  }

  render() {
    const { itemData, history, status, location, categories, type } = this.props
    const { search } = this.state

    if (!categories) {
      return null
    }

    const { totalItemsCount, itemsCountPerPage, activePage } = itemData

    const path = getItemListingPagePath(type, location.search, categories)

    return (
      <div className="item-list-page pb-3">
        {status === ITEM_LIST && <Loader />}
        <Desktop>
          <Row>
            <Col md={9}>
              {path && <Breadcrumbs path={path} className="mb-4" listClassName="p-0 pb-2 bg-transparent" />}
              {itemData.results.map(item => (
                <Item key={item.id} history={history} {...item} onRedirect={this.handleRedirect} />
              ))}
              <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                onChange={this.handlePageChange}
              />
            </Col>
            <Col md={3}>
              <input placeholder="Search..." className="pe-input w-100 mb-2" defaultValue={search} onKeyDown={this.handleSearchChange} />
              <ItemFilter caption={this.getDropdownToggleContent()} onChange={this.handleOrderingChange} />
              <Adsense.Google
                client="ca-pub-9509130066791988"
                slot="4021498111"
                style={{ display: 'block' }}
                format="auto"
                responsive="true"
              />
            </Col>
          </Row>
        </Desktop>

        <TabletOrMobile>
          <Row>
            <Col className="col-12">{path && <Breadcrumbs path={path} className="mb-4" listClassName="p-0 pb-2 bg-transparent" />}</Col>
          </Row>
          <Row>
            <Col className="col-6">
              <input placeholder="Search..." className="pe-input w-100" defaultValue={search} onKeyDown={this.handleSearchChange} />
            </Col>
            <Col className="col-6">
              <ItemFilter caption={this.getDropdownToggleContent()} onChange={this.handleOrderingChange} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="col-12">
              {itemData.results.map(item => (
                <Item key={item.id} history={history} {...item} onRedirect={this.handleRedirect} />
              ))}
              <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                onChange={this.handlePageChange}
              />
            </Col>
          </Row>
        </TabletOrMobile>
      </div>
    )
  }
}

const selectors = createStructuredSelector({
  itemData: selectItemData,
  categories: selectCategories,
  status: selectItemStatus,
  error: selectItemError,
})

const actions = {
  itemList,
  clearItems,
  categoryFetch,
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(ItemListingPage)
