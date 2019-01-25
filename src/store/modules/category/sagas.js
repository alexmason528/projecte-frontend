import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import { parseError } from 'utils/error-parser'
import { API_BASE_URL } from 'config/base'
import { CATEGORY_FETCH } from './constants'

import { categoryFetchSuccess, categoryFetchFail } from './reducer'
import { selectCategories } from './selectors'

const doCategoryFetch = function*() {
  const categories = yield select(selectCategories)

  try {
    if (!categories) {
      const res = yield call(axios.get, `${API_BASE_URL}/api/category/`)
      yield put(categoryFetchSuccess(res.data))
    } else {
      yield put(categoryFetchSuccess(categories))
    }
  } catch (error) {
    yield put(categoryFetchFail(parseError(error)))
  }
}

export const saga = function*() {
  yield takeLatest(CATEGORY_FETCH, doCategoryFetch)
}
