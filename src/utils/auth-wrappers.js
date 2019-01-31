import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { selectIsLoggedIn, selectIsVerified, selectRedirectPath } from 'store/modules/auth'

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/auth',
  allowRedirectBack: false,
  authenticatedSelector: selectIsLoggedIn,
  wrapperDisplayName: 'UserIsAuthenticated',
})

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => {
    const redirectPath = selectRedirectPath(state)
    return redirectPath || '/me/profile'
  },
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
