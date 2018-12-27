import { validatorFactory } from 'utils/redux-form'

const schema = {
  content: {
    presence: true,
  },
}

export default validatorFactory(schema)
