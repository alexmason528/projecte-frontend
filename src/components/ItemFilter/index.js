import React from 'react'
import PropTypes from 'prop-types'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { ORDERING_CONSTS } from 'config/base'

const ItemFilter = ({ className, caption, onChange }) => (
  <UncontrolledDropdown className={className}>
    <DropdownToggle className="w-100 text-left py-2" caret>
      {caption}
    </DropdownToggle>
    <DropdownMenu className="w-100">
      {ORDERING_CONSTS.map(ordering => (
        <DropdownItem key={ordering.id} onClick={() => onChange(ordering.id)}>
          {ordering.content}
        </DropdownItem>
      ))}
      <DropdownItem onClick={() => onChange('clear')}>Clear filter</DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
)

ItemFilter.propTypes = {
  className: PropTypes.string,
  caption: PropTypes.string,
  onChange: PropTypes.func,
}

ItemFilter.defaultProps = {
  className: 'pe-dropdown',
}

export default ItemFilter
