import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, FormFeedback, Input, Label, Row, Col } from 'reactstrap'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import { API_BASE_URL } from 'config/base'

export const renderInput = ({ input, label, placeholder, type, meta: { touched, error }, ...props }) => {
  const inputProps = Object.assign(
    {
      ...input,
      ...props,
      placeholder: placeholder || label,
      type,
    },
    touched && error && { invalid: true },
    touched && !error && { valid: true },
  )

  if (!label) {
    return (
      <div>
        <Input {...inputProps} />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </div>
    )
  }

  return (
    <Row>
      {label && (
        <Label sm={3} className="form-label my-auto">
          {label}
        </Label>
      )}
      <Col sm={9}>
        <Input {...inputProps} />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </Col>
    </Row>
  )
}

renderInput.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
}

export class renderPhotoField extends Component {
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
    const { input } = this.props

    return (
      <div>
        <div className="user-photo-wrapper mb-3 text-center">{this.renderPhoto()}</div>
        <input type="file" className="d-none" ref={ref => (this.uploader = ref)} onChange={this.handleChange} />
        <Button type="button" className="form-submit-btn w-100" onClick={this.handleOpenFileDialog}>
          Upload new photo
        </Button>
      </div>
    )
  }
}

renderPhotoField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
}
