import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { selectIsLoggedIn, selectIsVerified } from 'store/modules/auth'

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/auth',
  allowRedirectBack: false,
  authenticatedSelector: selectIsLoggedIn,
  wrapperDisplayName: 'UserIsAuthenticated',
})

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/me/profile',
  allowRedirectBack: false,
  authenticatedSelector: state => !selectIsLoggedIn(state),
  wrapperDisplayName: 'UserIsNotAuthenticated',
})

export const userIsVerified = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => selectIsVerified(state),
  wrapperDisplayName: 'UserIsVerfied',
})
