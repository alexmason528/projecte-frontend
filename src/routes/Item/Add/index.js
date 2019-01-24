import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Alert } from 'reactstrap'
import { MAIN_ITEM_TYPES } from 'config/base'
import ItemWizard from '../Wizard'

class ItemAddPage extends Component {
  static propTypes = {
    type: PropTypes.string,
    itemAdd: PropTypes.func,
  }

  componentWillMount() {
    const { type } = this.props

    if (MAIN_ITEM_TYPES.indexOf(type) === -1) {
      this.props.history.push('/error-404')
      return
    }
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

export default withRouter(ItemAddPage)
