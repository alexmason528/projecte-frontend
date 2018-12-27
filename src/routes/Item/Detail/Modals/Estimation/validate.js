import { validatorFactory } from 'utils/redux-form'

const schema = {
  value: {
    presence: true,
    numericality: true,
  },
}

export default validatorFactory(schema)
