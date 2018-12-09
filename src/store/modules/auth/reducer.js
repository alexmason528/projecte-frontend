import { createAction, handleActions, combineActions } from 'redux-actions'
import { getAuthData, setAuthData, clearAuthData } from 'utils/storage'
import { successAction, failAction } from 'utils/state-helpers'

import { AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT, SEND_VERIFY_EMAIL, VERIFY_EMAIL } from './constants'

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

export const register = createAction(AUTH_REGISTER)
export const registerSuccess = createAction(successAction(AUTH_REGISTER))
export const registerFail = createAction(failAction(AUTH_REGISTER))

export const sendVerifyEmail = createAction(SEND_VERIFY_EMAIL)
export const sendVerifyEmailSuccess = createAction(successAction(SEND_VERIFY_EMAIL))
export const sendVerifyEmailFail = createAction(successAction(SEND_VERIFY_EMAIL))

export const verifyEmail = createAction(VERIFY_EMAIL)
export const verifyEmailSuccess = createAction(successAction(VERIFY_EMAIL))
export const verifyEmailFail = createAction(failAction(VERIFY_EMAIL))

export const reducer = handleActions(
  {
    [successAction(AUTH_LOGIN)]: (state, { payload, type }) => {
      setAuthData(payload)
      return { ...state, user: payload.user, status: type }
    },

    [successAction(AUTH_REGISTER)]: (state, { payload, type }) => {
      setAuthData(payload)
      return { ...state, user: payload.user, status: type }
    },

    [successAction(VERIFY_EMAIL)]: (state, { payload, type }) => {
      setAuthData(payload)
      return { ...state, user: payload.user, status: type }
    },

    [AUTH_LOGOUT]: (state, { type }) => {
      clearAuthData()
      return { ...state, user: null, state: type }
    },

    [combineActions(AUTH_LOGIN, AUTH_REGISTER, SEND_VERIFY_EMAIL, VERIFY_EMAIL, successAction(SEND_VERIFY_EMAIL))]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [combineActions(failAction(AUTH_REGISTER), failAction(AUTH_LOGIN), failAction(SEND_VERIFY_EMAIL), failAction(VERIFY_EMAIL))]: (
      state,
      { payload, type },
    ) => ({
      ...state,
      status: type,
      error: payload.message,
    }),

    '@@router/LOCATION_CHANGE': state => ({ ...state, error: null }),
  },
  initialState,
)
