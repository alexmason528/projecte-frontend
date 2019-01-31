import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import { setRedirectPath } from 'store/modules/auth'
import ItemWizard from '../Wizard'

export class ItemAddPage extends Component {
  static propTypes = {
    type: PropTypes.string,
    setRedirectPath: PropTypes.func,
  }

  componentWillMount() {
    this.props.setRedirectPath()
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

const actions = {
  setRedirectPath,
}

export default connect(
  null,
  actions,
)(ItemAddPage)
