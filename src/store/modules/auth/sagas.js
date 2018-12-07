import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import { AUTH_LOGIN, AUTH_REGISTER } from './constants'

import { logInSuccess, logInFail, registerSuccess, registerFail } from './reducer'

const doLogIn = function*({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/auth/login`, payload)
    yield put(logInSuccess(res.data))
  } catch (error) {
    yield put(logInFail(error.response ? error.response.data : {}))
  }
}

const doRegister = function*({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/auth/register`, payload)
    yield put(registerSuccess(res.data))
  } catch (error) {
    yield put(registerFail(error.response ? error.response.data : {}))
  }
}

export const saga = function*() {
  yield takeLatest(AUTH_LOGIN, doLogIn)
  yield takeLatest(AUTH_REGISTER, doRegister)
}
