import React from 'react'
import PropTypes from 'prop-types'
import { FormFeedback, Input, Label, Row, Col } from 'reactstrap'

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
