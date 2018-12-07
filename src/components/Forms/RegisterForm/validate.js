import { validatorFactory } from 'utils/redux-form'

const schema = {
  username: {
    presence: true,
  },
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
  },
  confirmPassword: {
    presence: true,
    equality: 'password',
  },
}

export default validatorFactory(schema)
