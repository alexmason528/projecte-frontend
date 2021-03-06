import validator from 'validate.js'
import { forEach } from 'lodash'

/**
 * Function used to create validators with Validate.js
 */
export function validatorFactory(schema) {
  return values => {
    const errors = validator(values, schema)
    forEach(errors, (item, key) => (errors[key] = item[0]))
    // It should return empty object, otherwise redux-form complains
    return errors || {}
  }
}
