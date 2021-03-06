import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { parseError } from 'utils/error-parser'
import { API_BASE_URL } from 'config/base'
import {
  ITEM_LIST,
  ITEM_ADD,
  ITEM_GET,
  ITEM_UPDATE,
  ITEM_DELETE,
  ITEM_ADD_ESTIMATION,
  ITEM_ADD_TO_WATCHLIST,
  ITEM_ADD_REPLY,
} from './constants'

import {
  itemListSuccess,
  itemListFail,
  itemAddSuccess,
  itemAddFail,
  itemGetSuccess,
  itemGetFail,
  itemUpdateSuccess,
  itemUpdateFail,
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
    const res = yield call(axios.post, `${API_BASE_URL}/api/item/${type}/`, data)
    yield put(itemAddSuccess(res.data))
  } catch (error) {
    yield put(itemAddFail(parseError(error)))
  }
}

const doItemGet = function*({ payload }) {
  const { type, slug } = payload

  try {
    const res = yield call(axios.get, `${API_BASE_URL}/api/item/${type}/${slug}/`)
    yield put(itemGetSuccess(res.data))
  } catch (error) {
    yield put(itemGetFail(parseError(error)))
  }
}

const doItemUpdate = function*({ payload }) {
  const { type, slug, data } = payload

  try {
    const res = yield call(axios.patch, `${API_BASE_URL}/api/item/${type}/${slug}/`, data)
    yield put(itemUpdateSuccess(res.data))
  } catch (error) {
    yield put(itemUpdateFail(parseError(error)))
  }
}

const doItemDelete = function*({ payload }) {
  const { type, slug } = payload

  try {
    const res = yield call(axios.delete, `${API_BASE_URL}/api/item/${type}/${slug}/`)
    yield put(itemDeleteSuccess(res.data))
  } catch (error) {
    yield put(itemDeleteFail(parseError(error)))
  }
}

const doItemAddEstimation = function*({ payload }) {
  const { type, slug, data } = payload

  try {
    const res = yield call(axios.post, `${API_BASE_URL}/api/item/${type}/${slug}/estimation/`, data)
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
  const { type, slug, data } = payload

  try {
    const res = yield call(axios.post, `${API_BASE_URL}/api/item/${type}/${slug}/reply/`, data)
    yield put(itemAddReplySuccess(res.data))
  } catch (error) {
    yield put(itemAddReplyFail(parseError(error)))
  }
}

export const saga = function*() {
  yield takeLatest(ITEM_LIST, doItemList)
  yield takeLatest(ITEM_ADD, doItemAdd)
  yield takeLatest(ITEM_GET, doItemGet)
  yield takeLatest(ITEM_UPDATE, doItemUpdate)
  yield takeLatest(ITEM_DELETE, doItemDelete)
  yield takeLatest(ITEM_ADD_ESTIMATION, doItemAddEstimation)
  yield takeLatest(ITEM_ADD_TO_WATCHLIST, doItemAddToWatchlist)
  yield takeLatest(ITEM_ADD_REPLY, doItemAddReply)
}
