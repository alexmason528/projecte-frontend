import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'
import ItemWizard from '../Wizard'

export default class ItemAddPage extends Component {
  static propTypes = {
    type: PropTypes.string,
  }

  render() {
    const { type, error } = this.props

    if (error) {
      return <Alert color="danger">{error}></Alert>
    }

    return (
      <div className="item-add-page">
        <ItemWizard type={type} />
      </div>
    )
  }
}
