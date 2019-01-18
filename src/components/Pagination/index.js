import React from 'react'
import PropTypes from 'prop-types'
import ReactJSPagination from 'react-js-pagination'
import { MdFirstPage, MdLastPage, MdChevronLeft, MdChevronRight } from 'react-icons/md'

const Pagination = ({ className, wrapperClassName, totalItemsCount, activePage, itemsCountPerPage, onChange }) => {
  if (!totalItemsCount) {
    return null
  }

  return (
    <div className={wrapperClassName}>
      <ReactJSPagination
        className={className}
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        firstPageText={<MdFirstPage />}
        lastPageText={<MdLastPage />}
        prevPageText={<MdChevronLeft />}
        nextPageText={<MdChevronRight />}
        onChange={onChange}
      />
    </div>
  )
}

export default Pagination

Pagination.propTypes = {
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  activePage: PropTypes.number,
  itemsCountPerPage: PropTypes.number,
  totalItemsCount: PropTypes.number,
  onChange: PropTypes.func,
}

Pagination.defaultProps = {
  className: 'pe-pagination',
  wrapperClassName: 'pagination-wrapper text-right',
}
