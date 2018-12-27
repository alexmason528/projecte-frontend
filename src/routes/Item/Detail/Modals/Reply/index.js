import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'
import EstimateForm from './form'

const ReplyModal = ({ isOpen, toggle, onSubmit }) => (
  <Modal className="reply-form" isOpen={isOpen} toggle={toggle}>
    <ModalBody className="pe-box">
      <EstimateForm onSubmit={onSubmit} />
    </ModalBody>
  </Modal>
)

ReplyModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default ReplyModal
