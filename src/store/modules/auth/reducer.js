import { createAction, handleActions, combineActions } from 'redux-actions'
import { LOCATION_CHANGE } from 'react-router-redux'
import { getAuthData, clearAuthData } from 'utils/storage'
import { successAction, failAction } from 'utils/state-helpers'

import { AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT, SEND_VERIFY_EMAIL, VERIFY_EMAIL, UPDATE_PROFILE } from './constants'

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

export const updateProfile = createAction(UPDATE_PROFILE)
export const updateProfileSuccess = createAction(successAction(UPDATE_PROFILE))
export const updateProfileFail = createAction(failAction(UPDATE_PROFILE))

export const reducer = handleActions(
  {
    [combineActions(successAction(AUTH_LOGIN), successAction(AUTH_REGISTER), successAction(VERIFY_EMAIL), successAction(UPDATE_PROFILE))]: (
      state,
      { payload, type },
    ) => ({ ...state, user: payload.user, status: type }),

    [AUTH_LOGOUT]: (state, { type }) => {
      clearAuthData()
      return { ...state, user: null, state: type }
    },

    [combineActions(AUTH_LOGIN, AUTH_REGISTER, SEND_VERIFY_EMAIL, VERIFY_EMAIL, successAction(SEND_VERIFY_EMAIL), UPDATE_PROFILE)]: (
      state,
      { type },
    ) => ({
      ...state,
      status: type,
    }),

    [combineActions(
      failAction(AUTH_REGISTER),
      failAction(AUTH_LOGIN),
      failAction(SEND_VERIFY_EMAIL),
      failAction(VERIFY_EMAIL),
      failAction(UPDATE_PROFILE),
    )]: (state, { payload, type }) => ({
      ...state,
      status: type,
      error: payload.message,
    }),

    [LOCATION_CHANGE]: state => ({ ...state, error: null }),
  },
  initialState,
)
