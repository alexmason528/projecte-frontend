import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import { API_BASE_URL } from 'config/base'

export default class PhotoField extends Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    buttonTitle: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
  }

  state = {
    image: null,
  }

  handleOpenFileDialog = () => {
    this.uploader.click()
  }

  handleChange = evt => {
    const file = evt.target.files[0]
    const { input } = this.props

    input.onChange(file)
    this.readImage(file)
  }

  readImage = file => {
    const comp = this

    let reader = new FileReader()

    reader.onload = function(e) {
      comp.setState({ image: e.target.result })
    }

    reader.readAsDataURL(file)
  }

  discardImage = () => {
    const { input } = this.props

    this.setState({ image: null })
    input.onChange(null)
  }

  renderPhoto = () => {
    const { image } = this.state
    const { meta } = this.props

    if (image) {
      return (
        <div className="user-photo" style={{ backgroundImage: `url(${image})` }}>
          <IoIosCloseCircleOutline className="user-photo-discard" onClick={this.discardImage} />
        </div>
      )
    } else if (meta.initial) {
      return <div className="user-photo" style={{ backgroundImage: `url("${API_BASE_URL}${meta.initial}")` }} />
    }

    return (
      <div className="user-photo" style={{ border: '1px solid #ccc' }}>
        <FaUserAlt className="user-dummy" />
      </div>
    )
  }

  render() {
    const { input, buttonTitle } = this.props

    return (
      <div>
        <div className="user-photo-wrapper mb-3 text-center">{this.renderPhoto()}</div>
        <input type="file" className="d-none" ref={ref => (this.uploader = ref)} onChange={this.handleChange} />
        <Button type="button" className="form-submit-btn w-100" onClick={this.handleOpenFileDialog}>
          {buttonTitle}
        </Button>
      </div>
    )
  }
}
