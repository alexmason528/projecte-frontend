import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import { AUTH_LOGIN } from './constants'
import { logInSuccess, logInFail } from './reducer'

const doLogIn = function*(action) {
  try {
    const response = yield call(axios.post, `${API_BASE_URL}/auth/login`, action.payload)
    yield put(logInSuccess(response.data))
  } catch (error) {
    yield put(logInFail(error.response ? error.response.data : {}))
  }
}

export const saga = function*() {
  yield takeLatest(AUTH_LOGIN, doLogIn)
}
