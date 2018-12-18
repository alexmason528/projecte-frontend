import { takeLatest, call, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { reset } from 'redux-form'
import axios from 'axios'
import { parseError } from 'utils/error-parser'
import { API_BASE_URL } from 'config/base'
import { ITEM_ADD } from './constants'

import { itemAddSuccess, itemAddFail } from './reducer'

const doItemAdd = function*({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/api/item/`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
    yield put(itemAddSuccess(res.data))
  } catch (error) {
    yield put(itemAddFail(parseError(error)))
  }
}

const doClearAddWizard = function*() {
  yield put(reset('add-wizard'))
}

export const saga = function*() {
  yield takeLatest(ITEM_ADD, doItemAdd)
  yield takeLatest(LOCATION_CHANGE, doClearAddWizard)
}
