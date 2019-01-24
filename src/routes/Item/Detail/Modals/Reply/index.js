import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'
import { intlShape, injectIntl } from 'react-intl'
import swal from 'sweetalert'
import { ITEM_ADD_REPLY } from 'store/modules/item'
import { successAction } from 'utils/state-helpers'
import ReplyForm from './form'
import messages from 'messages'

export class ReplyModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    status: PropTypes.string,
    error: PropTypes.string,
    toggle: PropTypes.func,
    onSubmit: PropTypes.func,
    intl: intlShape.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { status, intl } = this.props
    if (status === ITEM_ADD_REPLY && nextProps.status !== status) {
      const success = nextProps.status === successAction(ITEM_ADD_REPLY)

      this.props.toggle()

      swal({ className: 'pe-swal', text: intl.formatMessage(success ? messages.addCommentSuccess : messages.addCommentFail) })
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

export default injectIntl(ReplyModal)
