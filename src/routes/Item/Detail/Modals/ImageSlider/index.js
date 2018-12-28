import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody } from 'reactstrap'
import Slider from 'react-slick'
import { MdClose, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { getURL } from 'utils/common'

export default class ImageSliderModal extends Component {
  static propTypes = {
    images: PropTypes.array,
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
  }

  handlePrev = () => {
    this.slider && this.slider.slickPrev()
  }

  handleNext = () => {
    this.slider && this.slider.slickNext()
  }

  render() {
    const { images, isOpen, toggle } = this.props

    return (
      <Modal className="popup-modal image-slider-modal" isOpen={isOpen} toggle={toggle}>
        <ModalBody>
          <Slider dots={false} infinite adaptiveHeight slidesToShow={1} slidesToScroll={1} ref={ref => (this.slider = ref)}>
            {images.map(({ id, obj }) => (
              <img key={id} src={getURL(obj)} alt="" />
            ))}
          </Slider>
          <Button className="pe-btn close-modal-btn" onClick={this.props.toggle}>
            <MdClose />
          </Button>
          <Button className="pe-btn prev-btn" onClick={this.handlePrev}>
            <MdKeyboardArrowLeft />
          </Button>
          <Button className="pe-btn next-btn" onClick={this.handleNext}>
            <MdKeyboardArrowRight />
          </Button>
        </ModalBody>
      </Modal>
    )
  }
}
