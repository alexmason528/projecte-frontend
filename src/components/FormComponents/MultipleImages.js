import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Row, Col } from 'reactstrap'
import { values } from 'lodash'
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
    files: [],
  }

  componentWillMount() {
    const { input } = this.props
    this.setState({ files: input.value })

    this.readImages(input.value)
  }

  handleOpenUploader = () => {
    this.uploader.click()
  }

  handleUploaderChange = evt => {
    const files = values(evt.target.files).map(obj => ({ description: '', obj, image: null }))

    const newFiles = [...this.state.files, ...files]

    this.setState({ files: newFiles }, this.emitChange)
    this.readImages(newFiles)
  }

  readImages = files => {
    const comp = this

    const readImage = (file, ind) => {
      let reader = new FileReader()

      reader.onload = function(e) {
        comp.setState({ files: comp.state.files.map((file, fInd) => ({ ...file, image: ind === fInd ? e.target.result : file.image })) })
      }

      reader.readAsDataURL(file)
    }

    files &&
      files.forEach((file, ind) => {
        if (!file.image) {
          readImage(file.obj, ind)
        }
      })
  }

  handleDescriptionChange = (value, ind) => {
    const { files } = this.state
    const newFiles = files.map((file, fInd) => ({
      ...file,
      description: fInd === ind ? value : file.description,
    }))

    this.setState({ files: newFiles }, this.emitChange)
  }

  handleMoveFile = (ind, dir) => {
    const { files } = this.state

    if ((dir === 'up' && ind === 0) || (dir === 'down' && ind === files.length - 1)) {
      return
    }

    if (dir === 'up') {
      const tmp = files[ind - 1]
      files[ind - 1] = files[ind]
      files[ind] = tmp
    } else if (dir === 'down') {
      const tmp = files[ind + 1]
      files[ind + 1] = files[ind]
      files[ind] = tmp
    }

    this.setState({ files }, this.emitChange)
  }

  handleDeleteFile = ind => {
    const { files } = this.state
    const newFiles = files.filter((file, fInd) => fInd !== ind)

    this.setState({ files: newFiles }, this.emitChange)
  }

  emitChange = () => {
    const { input } = this.props
    const { files } = this.state

    input.onChange(files)
  }

  render() {
    const {
      input,
      meta: { touched, error },
    } = this.props
    const { files } = this.state

    return (
      <Row>
        <Col md={12}>
          {touched && error && <Alert color="danger">{error}</Alert>}
          <div className="d-flex justify-content-center">
            <img className="mr-2" src={PicImage} alt="" style={{ height: 45 }} />
            <button type="button" className="pe-btn" onClick={this.handleOpenUploader}>
              Select images
            </button>
            <input type="file" className="d-none" multiple ref={ref => (this.uploader = ref)} onChange={this.handleUploaderChange} />
          </div>
        </Col>
        {files && files.length > 0 && (
          <Col md={12}>
            {files.map((file, ind) => (
              <Image
                key={ind}
                file={file}
                ind={ind}
                onDescriptionChange={value => this.handleDescriptionChange(value, ind)}
                onMove={this.handleMoveFile}
                onDelete={this.handleDeleteFile}
              />
            ))}
          </Col>
        )}
      </Row>
    )
  }
}
