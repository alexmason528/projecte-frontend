import { createAction, handleActions, combineActions } from 'redux-actions'
import { LOCATION_CHANGE } from 'connected-react-router'
import { getAuthData, clearAuthData } from 'utils/storage'
import { successAction, failAction } from 'utils/state-helpers'

import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  AUTH_SEND_VERIFY_EMAIL,
  AUTH_VERIFY_EMAIL,
  AUTH_SEND_PASSWORD_RESET_EMAIL,
  AUTH_PASSWORD_RESET,
  AUTH_GET_PROFILE,
  AUTH_UPDATE_PROFILE,
  AUTH_LIST_MY_LISTINGS,
  AUTH_LIST_WATCHLIST,
  AUTH_DELETE_ITEM_FROM_WATCHLIST,
  AUTH_GET_USER_INFO,
  CLEAR_ITEMS,
  DEFAULT_LOCALE,
} from './constants'

import { ITEM_DELETE } from 'store/modules/item'

/* Inital state */

const authData = getAuthData()

const initialState = {
  user: authData ? authData.user : null,
  items: {
    totalItemsCount: 0,
    itemsCountPerPage: 0,
    activePage: 1,
    results: [],
  },
  newPassword: null,
  userInfo: null,
  status: null,
  error: null,
  locale: DEFAULT_LOCALE,
}

/* Action creators */

export const logIn = createAction(AUTH_LOGIN)
export const logInSuccess = createAction(successAction(AUTH_LOGIN))
export const logInFail = createAction(failAction(AUTH_LOGIN))

export const logOut = createAction(AUTH_LOGOUT)

export const register = createAction(AUTH_REGISTER)
export const registerSuccess = createAction(successAction(AUTH_REGISTER))
export const registerFail = createAction(failAction(AUTH_REGISTER))

export const sendVerifyEmail = createAction(AUTH_SEND_VERIFY_EMAIL)
export const sendVerifyEmailSuccess = createAction(successAction(AUTH_SEND_VERIFY_EMAIL))
export const sendVerifyEmailFail = createAction(successAction(AUTH_SEND_VERIFY_EMAIL))

export const verifyEmail = createAction(AUTH_VERIFY_EMAIL)
export const verifyEmailSuccess = createAction(successAction(AUTH_VERIFY_EMAIL))
export const verifyEmailFail = createAction(failAction(AUTH_VERIFY_EMAIL))

export const sendPasswordResetEmail = createAction(AUTH_SEND_PASSWORD_RESET_EMAIL)
export const sendPasswordResetEmailSuccess = createAction(successAction(AUTH_SEND_PASSWORD_RESET_EMAIL))
export const sendPasswordResetEmailFail = createAction(successAction(AUTH_SEND_PASSWORD_RESET_EMAIL))

export const passwordReset = createAction(AUTH_PASSWORD_RESET)
export const passwordResetSuccess = createAction(successAction(AUTH_PASSWORD_RESET))
export const passwordResetFail = createAction(failAction(AUTH_PASSWORD_RESET))

export const getProfile = createAction(AUTH_GET_PROFILE)
export const getProfileSuccess = createAction(successAction(AUTH_GET_PROFILE))
export const getProfileFail = createAction(failAction(AUTH_GET_PROFILE))

export const updateProfile = createAction(AUTH_UPDATE_PROFILE)
export const updateProfileSuccess = createAction(successAction(AUTH_UPDATE_PROFILE))
export const updateProfileFail = createAction(failAction(AUTH_UPDATE_PROFILE))

export const listMyListings = createAction(AUTH_LIST_MY_LISTINGS)
export const listMyListingsSuccess = createAction(successAction(AUTH_LIST_MY_LISTINGS))
export const listMyListingsFail = createAction(failAction(AUTH_LIST_MY_LISTINGS))

export const listWatchlist = createAction(AUTH_LIST_WATCHLIST)
export const listWatchlistSuccess = createAction(successAction(AUTH_LIST_WATCHLIST))
export const listWatchlistFail = createAction(failAction(AUTH_LIST_WATCHLIST))

export const deleteItemFromWatchlist = createAction(AUTH_DELETE_ITEM_FROM_WATCHLIST)
export const deleteItemFromWatchlistSuccess = createAction(successAction(AUTH_DELETE_ITEM_FROM_WATCHLIST))
export const deleteItemFromWatchlistFail = createAction(failAction(AUTH_DELETE_ITEM_FROM_WATCHLIST))

export const getUserInfo = createAction(AUTH_GET_USER_INFO)
export const getUserInfoSuccess = createAction(successAction(AUTH_GET_USER_INFO))
export const getUserInfoFail = createAction(failAction(AUTH_GET_USER_INFO))

export const clearItems = createAction(CLEAR_ITEMS)

export const reducer = handleActions(
  {
    [combineActions(
      successAction(AUTH_LOGIN),
      successAction(AUTH_REGISTER),
      successAction(AUTH_VERIFY_EMAIL),
      successAction(AUTH_UPDATE_PROFILE),
    )]: (state, { payload, type }) => ({ ...state, user: payload.user, status: type }),

    [successAction(AUTH_PASSWORD_RESET)]: (state, { payload, type }) => ({ ...state, newPassword: payload, status: type }),

    [successAction(AUTH_GET_PROFILE)]: (state, { payload, type }) => ({ ...state, user: payload, status: type }),

    [successAction(AUTH_LIST_MY_LISTINGS)]: (state, { payload, type }) => ({ ...state, items: payload, status: type }),

    [successAction(AUTH_LIST_WATCHLIST)]: (state, { payload, type }) => ({ ...state, items: payload, status: type }),

    [successAction(AUTH_PASSWORD_RESET)]: (state, { payload, type }) => ({ ...state, newPassword: payload, status: type }),

    [successAction(AUTH_GET_USER_INFO)]: (state, { payload, type }) => ({ ...state, userInfo: payload, status: type }),

    [AUTH_PASSWORD_RESET]: (state, { type }) => ({ ...state, newPassword: null, status: type }),

    [AUTH_LOGOUT]: (state, { type }) => {
      clearAuthData()
      return { ...state, user: null, status: type }
    },

    [AUTH_GET_USER_INFO]: (state, { type }) => ({ ...state, userInfo: null, stats: type }),

    [combineActions(
      AUTH_LOGIN,
      AUTH_REGISTER,
      AUTH_SEND_VERIFY_EMAIL,
      successAction(AUTH_SEND_VERIFY_EMAIL),
      AUTH_SEND_PASSWORD_RESET_EMAIL,
      successAction(AUTH_SEND_PASSWORD_RESET_EMAIL),
      AUTH_VERIFY_EMAIL,
      AUTH_GET_PROFILE,
      AUTH_UPDATE_PROFILE,
      AUTH_LIST_MY_LISTINGS,
      AUTH_LIST_WATCHLIST,
      AUTH_DELETE_ITEM_FROM_WATCHLIST,
      successAction(AUTH_DELETE_ITEM_FROM_WATCHLIST),
      ITEM_DELETE,
      successAction(ITEM_DELETE),
    )]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [combineActions(
      failAction(AUTH_REGISTER),
      failAction(AUTH_LOGIN),
      failAction(AUTH_SEND_VERIFY_EMAIL),
      failAction(AUTH_VERIFY_EMAIL),
      failAction(AUTH_SEND_PASSWORD_RESET_EMAIL),
      failAction(AUTH_PASSWORD_RESET),
      failAction(AUTH_GET_PROFILE),
      failAction(AUTH_UPDATE_PROFILE),
      failAction(AUTH_LIST_MY_LISTINGS),
      failAction(AUTH_LIST_WATCHLIST),
      failAction(AUTH_DELETE_ITEM_FROM_WATCHLIST),
      failAction(AUTH_GET_USER_INFO),
      failAction(ITEM_DELETE),
    )]: (state, { payload, type }) => ({
      ...state,
      status: type,
      error: payload.message,
    }),

    [CLEAR_ITEMS]: (state, { type }) => ({ ...state, items: { ...initialState.items }, status: type }),

    [LOCATION_CHANGE]: state => ({ ...state, error: null }),
  },
  initialState,
)
