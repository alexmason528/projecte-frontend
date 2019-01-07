import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'
import swal from 'sweetalert'
import { ITEM_ADD_REPLY } from 'store/modules/item'
import { successAction } from 'utils/state-helpers'
import ReplyForm from './form'

export default class ReplyModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    status: PropTypes.string,
    error: PropTypes.string,
    toggle: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  componentWillReceiveProps(nextProps) {
    const { status } = this.props
    if (status === ITEM_ADD_REPLY && nextProps.status !== status) {
      const success = nextProps.status === successAction(ITEM_ADD_REPLY)

      this.props.toggle()

      swal({ className: 'pe-swal', text: success ? 'Your comment is added successfully' : nextProps.error })
    }
  }

  render() {
    const { isOpen, status, toggle, onSubmit } = this.props

    const loading = status === ITEM_ADD_REPLY

    return (
      <Modal className="popup-modal reply-modal" isOpen={isOpen} toggle={toggle}>
        <ModalBody className="pe-box">
          <ReplyForm loading={loading} onSubmit={onSubmit} />
        </ModalBody>
      </Modal>
    )
  }
}
