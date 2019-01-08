import { takeLatest, call, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import { reset } from 'redux-form'
import axios from 'axios'
import { parseError } from 'utils/error-parser'
import { API_BASE_URL } from 'config/base'
import { ITEM_LIST, ITEM_ADD, ITEM_GET, ITEM_DELETE, ITEM_ADD_ESTIMATION, ITEM_ADD_TO_WATCHLIST, ITEM_ADD_REPLY } from './constants'

import {
  itemListSuccess,
  itemListFail,
  itemAddSuccess,
  itemAddFail,
  itemGetSuccess,
  itemGetFail,
  itemDeleteSuccess,
  itemDeleteFail,
  itemAddEstimationSuccess,
  itemAddEstimationFail,
  itemAddToWatchlistSuccess,
  itemAddToWatchlistFail,
  itemAddReplySuccess,
  itemAddReplyFail,
} from './reducer'

const doItemList = function*({ payload }) {
  const { type, params } = payload

  try {
    const res = yield call(axios.get, `${API_BASE_URL}/api/item/${type}/`, { params })
    yield put(itemListSuccess(res.data))
  } catch (error) {
    yield put(itemListFail(parseError(error)))
  }
}

const doItemAdd = function*({ payload }) {
  const { type, data } = payload
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/api/item/${type}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    yield put(itemAddSuccess(res.data))
    yield put(reset('add-wizard'))
  } catch (error) {
    yield put(itemAddFail(parseError(error)))
  }
}

const doItemGet = function*({ payload }) {
  const { type, id } = payload

  try {
    const res = yield call(axios.get, `${API_BASE_URL}/api/item/${type}/${id}/`)
    yield put(itemGetSuccess(res.data))
  } catch (error) {
    yield put(itemGetFail(parseError(error)))
  }
}

const doItemDelete = function*({ payload }) {
  const { type, id } = payload

  try {
    const res = yield call(axios.delete, `${API_BASE_URL}/api/item/${type}/${id}/`)
    yield put(itemDeleteSuccess(res.data))
  } catch (error) {
    yield put(itemDeleteFail(parseError(error)))
  }
}

const doItemAddEstimation = function*({ payload }) {
  const { type, id, data } = payload

  try {
    const res = yield call(axios.post, `${API_BASE_URL}/api/item/${type}/${id}/estimation/`, data)
    yield put(itemAddEstimationSuccess(res.data))
  } catch (error) {
    yield put(itemAddEstimationFail(parseError(error)))
  }
}

const doItemAddToWatchlist = function*({ payload }) {
  const data = { item: payload }

  try {
    const res = yield call(axios.post, `${API_BASE_URL}/auth/watchlist/`, data)
    yield put(itemAddToWatchlistSuccess(res.data))
  } catch (error) {
    yield put(itemAddToWatchlistFail(parseError(error)))
  }
}

const doItemAddReply = function*({ payload }) {
  const { type, id, data } = payload

  try {
    const res = yield call(axios.post, `${API_BASE_URL}/api/item/${type}/${id}/reply/`, data)
    yield put(itemAddReplySuccess(res.data))
  } catch (error) {
    yield put(itemAddReplyFail(parseError(error)))
  }
}

const doClearAddWizard = function*() {
  yield put(reset('add-wizard'))
}

export const saga = function*() {
  yield takeLatest(ITEM_LIST, doItemList)
  yield takeLatest(ITEM_ADD, doItemAdd)
  yield takeLatest(ITEM_GET, doItemGet)
  yield takeLatest(ITEM_DELETE, doItemDelete)
  yield takeLatest(ITEM_ADD_ESTIMATION, doItemAddEstimation)
  yield takeLatest(ITEM_ADD_TO_WATCHLIST, doItemAddToWatchlist)
  yield takeLatest(ITEM_ADD_REPLY, doItemAddReply)
  yield takeLatest(LOCATION_CHANGE, doClearAddWizard)
}
