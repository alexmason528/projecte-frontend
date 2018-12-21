import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { parseError } from 'utils/error-parser'
import { API_BASE_URL } from 'config/base'
import { CATEGORY_FETCH } from './constants'

import { categoryFetchSuccess, categoryFetchFail } from './reducer'

const doCategoryFetch = function*({ payload }) {
  try {
    const res = yield call(axios.get, `${API_BASE_URL}/api/category/${payload}/`)
    yield put(categoryFetchSuccess(res.data))
  } catch (error) {
    yield put(categoryFetchFail(parseError(error)))
  }
}

export const saga = function*() {
  yield takeLatest(CATEGORY_FETCH, doCategoryFetch)
}
