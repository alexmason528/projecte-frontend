import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'
import swal from 'sweetalert'
import { ITEM_ADD_ESTIMATION } from 'store/modules/item'
import { successAction } from 'utils/state-helpers'
import EstimateForm from './form'

export default class EstimationModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    status: PropTypes.string,
    error: PropTypes.string,
    toggle: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  componentWillReceiveProps(nextProps) {
    const { status } = this.props
    if (status === ITEM_ADD_ESTIMATION && nextProps.status !== status) {
      const success = nextProps.status === successAction(ITEM_ADD_ESTIMATION)

      this.props.toggle()

      swal({
        icon: success ? 'success' : 'error',
        text: success ? 'Your comment is added successfully' : nextProps.error,
      })
    }
  }

  render() {
    const { isOpen, status, toggle, onSubmit } = this.props

    const loading = status === ITEM_ADD_ESTIMATION

    return (
      <Modal className="estimation-modal" isOpen={isOpen} toggle={toggle}>
        <ModalBody className="pe-box">
          <EstimateForm loading={loading} onSubmit={onSubmit} />
        </ModalBody>
      </Modal>
    )
  }
}
