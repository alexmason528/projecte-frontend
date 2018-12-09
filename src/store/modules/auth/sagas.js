import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { parseError } from 'utils/error-parser'

import { API_BASE_URL } from 'config/base'

import { AUTH_LOGIN, AUTH_REGISTER, SEND_VERIFY_EMAIL, VERIFY_EMAIL } from './constants'

import {
  logInSuccess,
  logInFail,
  registerSuccess,
  registerFail,
  sendVerifyEmailSuccess,
  sendVerifyEmailFail,
  verifyEmailSuccess,
  verifyEmailFail,
} from './reducer'

const doLogIn = function*({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/auth/login`, payload)
    yield put(logInSuccess(res.data))
  } catch (error) {
    yield put(logInFail(parseError(error)))
  }
}

const doRegister = function*({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/auth/register`, payload)
    yield put(registerSuccess(res.data))
  } catch (error) {
    yield put(registerFail(parseError(error)))
  }
}

const doSendVerifyEmail = function*() {
  try {
    yield call(axios.get, `${API_BASE_URL}/auth/verify-email`)
    yield put(sendVerifyEmailSuccess())
  } catch (error) {
    yield put(sendVerifyEmailFail(parseError(error)))
  }
}

const doVerifyEmail = function*({ payload }) {
  try {
    const auth = yield call(axios.post, `${API_BASE_URL}/auth/verify-email`, payload)

    localStorage.setItem('auth', JSON.stringify(auth))

    yield put(verifyEmailSuccess(auth))
  } catch (error) {
    yield put(verifyEmailFail(parseError(error)))
  }
}

export const saga = function*() {
  yield takeLatest(AUTH_LOGIN, doLogIn)
  yield takeLatest(AUTH_REGISTER, doRegister)
  yield takeLatest(SEND_VERIFY_EMAIL, doSendVerifyEmail)
  yield takeLatest(VERIFY_EMAIL, doVerifyEmail)
}
