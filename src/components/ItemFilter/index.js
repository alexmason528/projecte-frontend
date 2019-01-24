import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { find } from 'lodash'
import { ORDERING_CONSTS } from 'config/base'

export default class ItemFilter extends Component {
  static propTypes = {
    ordering: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: 'pe-dropdown',
  }

  get caption() {
    const { ordering } = this.props
    const current = find(ORDERING_CONSTS, { id: ordering })

    if (ordering && current) {
      return (
        <Fragment>
          <FormattedMessage id={current.text} /> {current.icon}
        </Fragment>
      )
    }

    return <FormattedMessage id="estify.sortBy" />
  }

  render() {
    const { className, onChange } = this.props

    return (
      <UncontrolledDropdown className={className}>
        <DropdownToggle className="w-100 text-left py-2" caret>
          {this.caption}
        </DropdownToggle>
        <DropdownMenu className="w-100">
          {ORDERING_CONSTS.map(ordering => (
            <DropdownItem key={ordering.id} onClick={() => onChange(ordering.id)}>
              <FormattedMessage id={ordering.text} />
              {ordering.icon}
            </DropdownItem>
          ))}
          <DropdownItem onClick={() => onChange('clear')}>
            <FormattedMessage id="estify.clearFilter" />
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
}
