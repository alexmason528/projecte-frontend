import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import queryString from 'query-string'
import { Row, Col } from 'reactstrap'
import Pagination from 'react-js-pagination'
import { MdFirstPage, MdLastPage, MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { listMyListings, clearItems, selectItemData, selectAuthStatus, selectAuthError, AUTH_LIST_MY_LISTINGS } from 'store/modules/auth'
import { itemDelete, ITEM_DELETE } from 'store/modules/item'
import { Item, Loader } from 'components'

export class MyListingsPage extends Component {
  static propTypes = {
    itemData: PropTypes.shape({
      totalItemsCount: PropTypes.number,
      itemsCountPerPage: PropTypes.number,
      activePage: PropTypes.number,
      results: PropTypes.array,
    }),
    status: PropTypes.string,
    error: PropTypes.string,
    listMyListings: PropTypes.func,
    clearItems: PropTypes.func,
    itemDelete: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      page: 1,
    }
  }

  componentWillMount() {
    this.fetchData(this.props, true)
  }

  componentWillReceiveProps(nextProps) {
    const { location, status } = this.props
    if (location.search !== nextProps.location.search || (status === ITEM_DELETE && nextProps.status !== status)) {
      this.fetchData(nextProps)
    }
  }

  fetchData = (props, initial = false) => {
    const { location } = props
    const { page } = queryString.parse(location.search)

    if (initial) {
      this.props.clearItems()
      this.setState({ page })
    }

    this.props.listMyListings({ page })
  }

  changeLocation = () => {
    const { page } = this.state
    const { match } = this.props
    const queryParam = queryString.stringify({ page })

    const newUrl = `${match.url}?${queryParam}`

    this.props.history.push(newUrl)
  }

  handlePageChange = page => {
    this.setState({ page }, this.changeLocation)
  }

  handleRedirect = (id, type) => {
    this.props.history.push(`/item/${type}/${id}`)
  }

  handleItemDelete = (id, type) => {
    this.props.itemDelete({ id, type })
  }

  render() {
    const { history, status, itemData } = this.props
    const { activePage, itemsCountPerPage, totalItemsCount } = itemData

    return (
      <Row className="my-listing-page py-3">
        {status === AUTH_LIST_MY_LISTINGS && <Loader />}
        <Col md={9}>
          {itemData.results.length > 0 &&
            itemData.results.map(item => (
              <Item
                key={item.id}
                history={history}
                buttons="all"
                {...item}
                onRedirect={this.handleRedirect}
                onDelete={this.handleItemDelete}
              />
            ))}
          {totalItemsCount > 0 && (
            <div className="pagination-wrapper text-right">
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
      </Row>
    )
  }
}

const selectors = createStructuredSelector({
  itemData: selectItemData,
  status: selectAuthStatus,
  error: selectAuthError,
})

const actions = {
  listMyListings,
  clearItems,
  itemDelete,
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(MyListingsPage)
