import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { setAuthData } from 'utils/storage'
import { parseError } from 'utils/error-parser'

import { API_BASE_URL } from 'config/base'

import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_SEND_VERIFY_EMAIL,
  AUTH_VERIFY_EMAIL,
  AUTH_SEND_PASSWORD_RESET_EMAIL,
  AUTH_PASSWORD_RESET,
  AUTH_GET_PROFILE,
  AUTH_UPDATE_PROFILE,
  AUTH_LIST_MY_LISTINGS,
  AUTH_LIST_WATCHLIST,
  AUTH_DELETE_ITEM_FROM_WATCHLIST,
} from './constants'

import {
  logInSuccess,
  logInFail,
  registerSuccess,
  registerFail,
  sendVerifyEmailSuccess,
  sendVerifyEmailFail,
  verifyEmailSuccess,
  verifyEmailFail,
  sendPasswordResetEmailSuccess,
  sendPasswordResetEmailFail,
  passwordResetSuccess,
  passwordResetFail,
  getProfileSuccess,
  getProfileFail,
  updateProfileSuccess,
  updateProfileFail,
  listMyListingsSuccess,
  listMyListingsFail,
  listWatchlistSuccess,
  listWatchlistFail,
  deleteItemFromWatchlistSuccess,
  deleteItemFromWatchlistFail,
} from './reducer'

const doLogIn = function*({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/auth/login/`, payload)
    setAuthData(res.data)
    yield put(logInSuccess(res.data))
  } catch (error) {
    yield put(logInFail(parseError(error)))
  }
}

const doRegister = function*({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/auth/register/`, payload)
    setAuthData(res.data)
    yield put(registerSuccess(res.data))
  } catch (error) {
    yield put(registerFail(parseError(error)))
  }
}

const doSendVerifyEmail = function*() {
  try {
    yield call(axios.get, `${API_BASE_URL}/auth/verify-email/`)
    yield put(sendVerifyEmailSuccess())
  } catch (error) {
    yield put(sendVerifyEmailFail(parseError(error)))
  }
}

const doVerifyEmail = function*({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/auth/verify-email/`, payload)
    setAuthData(res.data)
    yield put(verifyEmailSuccess(res.data))
  } catch (error) {
    yield put(verifyEmailFail(parseError(error)))
  }
}

export const doSendPasswordResetEmail = function*({ payload }) {
  try {
    yield call(axios.post, `${API_BASE_URL}/auth/password-reset/`, payload)
    yield put(sendPasswordResetEmailSuccess())
  } catch (error) {
    yield put(sendPasswordResetEmailFail(parseError(error)))
  }
}

export const doPasswordReset = function*({ payload }) {
  try {
    const res = yield call(axios.put, `${API_BASE_URL}/auth/password-reset/`, payload)
    yield put(passwordResetSuccess(res.data.new_password))
  } catch (error) {
    yield put(passwordResetFail(parseError(error)))
  }
}

const doGetProfile = function*() {
  try {
    const res = yield call(axios.get, `${API_BASE_URL}/auth/profile/`)
    yield put(getProfileSuccess(res.data))
  } catch (error) {
    yield put(getProfileFail(parseError(error)))
  }
}

const doUpdateProfile = function*({ payload }) {
  try {
    const res = yield call(axios.patch, `${API_BASE_URL}/auth/profile/`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
    setAuthData(res.data)
    yield put(updateProfileSuccess(res.data))
  } catch (error) {
    yield put(updateProfileFail(parseError(error)))
  }
}

const doListMyListings = function*({ payload }) {
  try {
    const res = yield call(axios.get, `${API_BASE_URL}/auth/my-listings/`, { params: payload })
    yield put(listMyListingsSuccess(res.data))
  } catch (error) {
    yield put(listMyListingsFail(parseError(error)))
  }
}

const doListWatchlist = function*({ payload }) {
  try {
    const res = yield call(axios.get, `${API_BASE_URL}/auth/watchlist/`, { params: payload })
    yield put(listWatchlistSuccess(res.data))
  } catch (error) {
    yield put(listWatchlistFail(parseError(error)))
  }
}

const doDeleteItemFromWatchlist = function*({ payload }) {
  try {
    const res = yield call(axios.delete, `${API_BASE_URL}/auth/watchlist/${payload}/`)
    yield put(deleteItemFromWatchlistSuccess(res.data))
  } catch (error) {
    yield put(deleteItemFromWatchlistFail(parseError(error)))
  }
}

export const saga = function*() {
  yield takeLatest(AUTH_LOGIN, doLogIn)
  yield takeLatest(AUTH_REGISTER, doRegister)
  yield takeLatest(AUTH_SEND_VERIFY_EMAIL, doSendVerifyEmail)
  yield takeLatest(AUTH_VERIFY_EMAIL, doVerifyEmail)
  yield takeLatest(AUTH_SEND_PASSWORD_RESET_EMAIL, doSendPasswordResetEmail)
  yield takeLatest(AUTH_PASSWORD_RESET, doPasswordReset)
  yield takeLatest(AUTH_GET_PROFILE, doGetProfile)
  yield takeLatest(AUTH_UPDATE_PROFILE, doUpdateProfile)
  yield takeLatest(AUTH_LIST_MY_LISTINGS, doListMyListings)
  yield takeLatest(AUTH_LIST_WATCHLIST, doListWatchlist)
  yield takeLatest(AUTH_DELETE_ITEM_FROM_WATCHLIST, doDeleteItemFromWatchlist)
}
