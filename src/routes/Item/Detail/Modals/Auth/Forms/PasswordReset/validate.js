import { validatorFactory } from 'utils/redux-form'

const schema = {
  email: {
    presence: true,
    email: true,
  },
}

export default validatorFactory(schema)
