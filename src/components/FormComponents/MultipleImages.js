import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Row, Col } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { values } from 'lodash'
import axios from 'axios'
import { API_BASE_URL } from 'config/base'
import { Loader } from 'components'
import PicImage from 'assets/images/pic.png'
import Image from './Image'

export default class MultipleImages extends Component {
  static propTypes = {
    input: PropTypes.object,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
  }

  state = {
    images: [],
    uploading: false,
  }

  componentWillMount() {
    const { input } = this.props
    this.setState({ images: input.value })
  }

  handleOpenUploader = () => {
    this.uploader.click()
  }

  handleUploaderChange = evt => {
    const images = values(evt.target.files)

    if (images.length === 0) {
      return
    }

    const formData = new FormData()
    images.forEach(image => formData.append('images', image))

    this.setState({ uploading: true })

    axios
      .post(`${API_BASE_URL}/api/image-upload/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => {
        this.setState(
          {
            images: [...this.state.images, ...res.data.images.map(({ id, description, obj }) => ({ id, description, obj }))],
            uploading: false,
          },
          this.emitChange,
        )
      })
      .catch(error => {
        this.setState({ uploading: false })
      })
  }

  handleDescriptionChange = (value, ind) => {
    const { images } = this.state
    const newImages = images.map((image, iInd) => ({
      ...image,
      description: iInd === ind ? value : image.description,
    }))

    this.setState({ images: newImages }, this.emitChange)
  }

  handleMoveImage = (ind, dir) => {
    const { images } = this.state

    if ((dir === 'up' && ind === 0) || (dir === 'down' && ind === images.length - 1)) {
      return
    }

    if (dir === 'up') {
      const tmp = images[ind - 1]
      images[ind - 1] = images[ind]
      images[ind] = tmp
    } else if (dir === 'down') {
      const tmp = images[ind + 1]
      images[ind + 1] = images[ind]
      images[ind] = tmp
    }

    this.setState({ images }, this.emitChange)
  }

  handleDeleteImage = ind => {
    const { images } = this.state

    this.setState({ images: images.filter((image, iInd) => iInd !== ind) }, this.emitChange)
  }

  emitChange = () => {
    const { input } = this.props
    const { images } = this.state

    input.onChange(images)
  }

  render() {
    const {
      input,
      meta: { touched, error },
    } = this.props
    const { images, uploading } = this.state

    return (
      <Row>
        {uploading && <Loader />}
        <Col md={12}>
          {touched && error && <Alert color="danger">{error}</Alert>}
          <div className="d-flex justify-content-center">
            <img className="mr-2" src={PicImage} alt="" style={{ height: 45 }} />
            <button type="button" className="pe-btn" onClick={this.handleOpenUploader} disabled={uploading}>
              <FormattedMessage id="estify.selectImages" />
            </button>
            <input
              type="file"
              className="d-none"
              accept="image/*"
              multiple
              ref={ref => (this.uploader = ref)}
              onChange={this.handleUploaderChange}
            />
          </div>
        </Col>
        {images && images.length > 0 && (
          <Col md={12}>
            {images.map((image, ind) => (
              <Image
                key={ind}
                image={image}
                ind={ind}
                onDescriptionChange={value => this.handleDescriptionChange(value, ind)}
                onMove={this.handleMoveImage}
                onDelete={this.handleDeleteImage}
              />
            ))}
          </Col>
        )}
      </Row>
    )
  }
}
