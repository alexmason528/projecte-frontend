import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Label, FormFeedback } from 'reactstrap'
import ReactQuill from 'react-quill'

export const TextArea = ({ input, label, labelSize, placeholder, inline, meta: { touched, error }, ...props }) => {
  return (
    <Row>
      {label && (
        <Label sm={inline ? labelSize : 12} className="form-label my-auto">
          {label}
        </Label>
      )}
      <Col sm={inline && label ? 12 - labelSize : 0}>
        <ReactQuill value={input.value} onChange={input.onChange} placeholder={placeholder} {...props} />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </Col>
    </Row>
  )
}

TextArea.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  labelSize: PropTypes.number,
  placeholder: PropTypes.string,
  inline: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
}

TextArea.defaultProps = {
  labelSize: 3,
  inline: false,
}

export default TextArea
