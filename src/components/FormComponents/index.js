import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormFeedback, Input, Label } from 'reactstrap'

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

  return (
    <FormGroup>
      {label && <Label>{label}</Label>}
      <Input {...inputProps} />
      {touched && error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
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
