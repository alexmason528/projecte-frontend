import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'
import EstimateForm from './form'

const EstimationModal = ({ isOpen, toggle, onSubmit }) => (
  <Modal className="estimation-form" isOpen={isOpen} toggle={toggle}>
    <ModalBody className="pe-box">
      <EstimateForm onSubmit={onSubmit} />
    </ModalBody>
  </Modal>
)

EstimationModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default EstimationModal
