import { validatorFactory } from 'utils/redux-form'

const schema = {
  username: {
    presence: true,
  },
  email: {
    presence: true,
  },
  confirmPassword: {
    equality: 'password',
  },
}

export default validatorFactory(schema)
