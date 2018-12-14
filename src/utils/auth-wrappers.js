import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { selectIsLoggedIn } from 'store/modules/auth'

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/signin',
  allowRedirectBack: false,
  authenticatedSelector: selectIsLoggedIn,
  wrapperDisplayName: 'UserIsAuthenticated',
})

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => !selectIsLoggedIn(state),
  wrapperDisplayName: 'UserIsNotAuthenticated',
})
