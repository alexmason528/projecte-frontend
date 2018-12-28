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
    const { search } = this.props.location
    if (search !== nextProps.location.search) {
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

  handleItemClick = (id, type) => {
    this.props.history.push(`/item/${type}/${id}`)
  }

  render() {
    const { status, itemData } = this.props
    const { activePage, itemsCountPerPage, totalItemsCount } = itemData

    return (
      <Row className="my-listing-page py-3">
        {status === AUTH_LIST_MY_LISTINGS && <Loader />}
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
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(MyListingsPage)
