import { createAction, handleActions } from 'redux-actions'
import { REQUEST_INITIAL, REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAIL } from 'constants.js'
import { getAuthData, setAuthData, clearAuthData } from 'utils/storage'
import { successAction, failAction } from 'utils/state-helpers'

import { AUTH_LOGIN, AUTH_LOGOUT } from './constants'

/* Inital state */

const authData = getAuthData()

const initialState = {
  user: authData ? authData.user : null,
  status: null,
  error: null,
}

/* Action creators */

export const logIn = createAction(AUTH_LOGIN)
export const logInSuccess = createAction(successAction(AUTH_LOGIN))
export const logInFail = createAction(failAction(AUTH_LOGIN))
export const logOut = createAction(AUTH_LOGOUT)

export const reducer = handleActions(
  {
    [AUTH_LOGIN]: state => ({ ...state, status: REQUEST_PENDING }),

    [successAction(AUTH_LOGIN)]: (state, { payload }) => {
      setAuthData(payload)
      return { ...state, user: payload.user, status: REQUEST_SUCCESS }
    },

    [failAction(AUTH_LOGIN)]: (state, { payload }) => ({ ...state, status: REQUEST_FAIL, error: payload }),

    [AUTH_LOGOUT]: state => {
      clearAuthData()
      return { ...state, user: null, state: REQUEST_INITIAL }
    },
  },
  initialState,
)
