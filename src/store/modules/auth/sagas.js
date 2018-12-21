import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { setAuthData } from 'utils/storage'
import { parseError } from 'utils/error-parser'

import { API_BASE_URL } from 'config/base'

import { AUTH_LOGIN, AUTH_REGISTER, AUTH_SEND_VERIFY_EMAIL, AUTH_VERIFY_EMAIL, AUTH_UPDATE_PROFILE } from './constants'

import {
  logInSuccess,
  logInFail,
  registerSuccess,
  registerFail,
  sendVerifyEmailSuccess,
  sendVerifyEmailFail,
  verifyEmailSuccess,
  verifyEmailFail,
  updateProfileSuccess,
  updateProfileFail,
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

const doUpdateProfile = function*({ payload }) {
  try {
    const res = yield call(axios.patch, `${API_BASE_URL}/auth/profile/`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
    setAuthData(res.data)
    yield put(updateProfileSuccess(res.data))
  } catch (error) {
    yield put(updateProfileFail(parseError(error)))
  }
}

export const saga = function*() {
  yield takeLatest(AUTH_LOGIN, doLogIn)
  yield takeLatest(AUTH_REGISTER, doRegister)
  yield takeLatest(AUTH_SEND_VERIFY_EMAIL, doSendVerifyEmail)
  yield takeLatest(AUTH_VERIFY_EMAIL, doVerifyEmail)
  yield takeLatest(AUTH_UPDATE_PROFILE, doUpdateProfile)
}
