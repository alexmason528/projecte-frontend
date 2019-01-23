import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { itemGet, selectCurrentItem } from 'store/modules/item'
import ItemWizard from '../Wizard'

export class ItemEditPage extends Component {
  static propTypes = {
    item: PropTypes.object,
    match: PropTypes.object,
    type: PropTypes.string,
    itemGet: PropTypes.func,
  }

  componentWillMount() {
    const { type, match } = this.props

    this.props.itemGet({ type, slug: match.params.slug })
  }

  render() {
    const { item, type } = this.props

    if (!item) {
      return null
    }

    return (
      <div className="item-edit-page">
        <ItemWizard type={type} item={item} />
      </div>
    )
  }
}

const selectors = createStructuredSelector({
  item: selectCurrentItem,
})

const actions = {
  itemGet,
}

export default connect(
  selectors,
  actions,
)(ItemEditPage)
