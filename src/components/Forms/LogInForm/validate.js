import { validatorFactory } from 'utils/redux-form'

const schema = {
  username: {
    presence: true,
  },
  password: {
    presence: true,
  },
}

export default validatorFactory(schema)
