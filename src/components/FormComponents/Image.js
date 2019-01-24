import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MdClose, MdExpandLess, MdExpandMore } from 'react-icons/md'
import { FormattedMessage } from 'react-intl'
import { getURL } from 'utils/common'

export default class Image extends Component {
  static propTypes = {
    image: PropTypes.shape({
      id: PropTypes.number,
      obj: PropTypes.string,
      description: PropTypes.string,
    }),
    ind: PropTypes.number,
    onDescriptionChange: PropTypes.func,
    onDelete: PropTypes.func,
    onMove: PropTypes.func,
  }

  handleDescriptionChange = evt => {
    this.props.onDescriptionChange(evt.target.value)
  }

  handleMove = evt => {
    const { ind } = this.props
    this.props.onMove(ind, ind === 0 ? 'down' : 'up')
  }

  render() {
    const { image, ind } = this.props

    if (!image) {
      return null
    }

    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="image-preview mr-4" style={{ backgroundImage: `url(${getURL(image.obj)})` }} />
        <div className="image-description">
          <div>
            <div className="mb-2 font-weight-bold">
              <FormattedMessage id="estify.imageDescription" />
            </div>
            <textarea className="p-2" value={image.description || ''} onChange={this.handleDescriptionChange} />
          </div>
          <div className="image-actions d-flex justify-content-end">
            <button type="button" className="pe-btn mr-2" onClick={this.handleMove}>
              {ind === 0 ? <MdExpandMore /> : <MdExpandLess />}
            </button>
            <button type="button" className="pe-btn" onClick={() => this.props.onDelete(ind)}>
              <MdClose />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
