import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'
import { injectIntl, intlShape } from 'react-intl'
import swal from 'sweetalert'
import { ITEM_ADD_ESTIMATION } from 'store/modules/item'
import { successAction } from 'utils/state-helpers'
import EstimateForm from './form'
import messages from 'messages'

export class EstimationModal extends Component {
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
    if (status === ITEM_ADD_ESTIMATION && nextProps.status !== status) {
      const success = nextProps.status === successAction(ITEM_ADD_ESTIMATION)

      this.props.toggle()

      swal({
        className: 'pe-swal',
        text: intl.formatMessage(success ? messages.addEsitmationCommentSuccess : messages.addEsitmationCommentFail),
      })
    }
  }

  render() {
    const { isOpen, status, toggle, onSubmit } = this.props

    const loading = status === ITEM_ADD_ESTIMATION

    return (
      <Modal className="popup-modal estimation-modal" isOpen={isOpen} toggle={toggle}>
        <ModalBody className="pe-box">
          <EstimateForm loading={loading} onSubmit={onSubmit} />
        </ModalBody>
      </Modal>
    )
  }
}

export default injectIntl(EstimationModal)
