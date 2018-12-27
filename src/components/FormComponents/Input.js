import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input as RInput, Label, FormFeedback } from 'reactstrap'

export const Input = ({ input, label, placeholder, type, labelSize, meta: { touched, error }, ...props }) => {
  const inputProps = Object.assign(
    {
      ...input,
      ...props,
      placeholder,
      type,
    },
    touched && error && { invalid: true },
    touched && !error && { valid: true },
  )

  if (!label) {
    return (
      <Fragment>
        <RInput {...inputProps} />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </Fragment>
    )
  }

  return (
    <Row>
      {label && (
        <Label sm={labelSize} className="form-label my-auto">
          {label}
        </Label>
      )}
      <Col sm={12 - labelSize}>
        <RInput {...inputProps} />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </Col>
    </Row>
  )
}

Input.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  labelSize: PropTypes.number,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
}

Input.defaultProps = {
  labelSize: 3,
}

export default Input
