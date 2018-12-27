import { logOut } from 'store/modules/auth'

const authMiddleware = store => next => action => {
  if (action.type.substr(action.type.length - 5) === '/fail') {
    const { message } = action.payload
    if (message === 'Signature has expired.' || message === 'Invalid signature.') {
      store.dispatch(logOut())
    }
  }
  return next(action)
}

export default authMiddleware
