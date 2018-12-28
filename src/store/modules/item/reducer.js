import { createAction, handleActions, combineActions } from 'redux-actions'
import { LOCATION_CHANGE } from 'react-router-redux'
import { successAction, failAction } from 'utils/state-helpers'

import {
  ITEM_LIST,
  ITEM_ADD,
  ITEM_GET,
  ITEM_DELETE,
  ITEM_ADD_ESTIMATION,
  ITEM_ADD_TO_WATCHLIST,
  ITEM_ADD_REPLY,
  CLEAR_ITEMS,
} from './constants'

/* Inital state */

const initialState = {
  items: {
    totalItemsCount: 0,
    itemsCountPerPage: 0,
    activePage: 1,
    results: [],
  },
  currentItem: null,
  status: null,
  error: null,
}

/* Action creators */

export const itemList = createAction(ITEM_LIST)
export const itemListSuccess = createAction(successAction(ITEM_LIST))
export const itemListFail = createAction(failAction(ITEM_LIST))

export const itemAdd = createAction(ITEM_ADD)
export const itemAddSuccess = createAction(successAction(ITEM_ADD))
export const itemAddFail = createAction(failAction(ITEM_ADD))

export const itemGet = createAction(ITEM_GET)
export const itemGetSuccess = createAction(successAction(ITEM_GET))
export const itemGetFail = createAction(failAction(ITEM_GET))

export const itemDelete = createAction(ITEM_DELETE)
export const itemDeleteSuccess = createAction(successAction(ITEM_DELETE))
export const itemDeleteFail = createAction(failAction(ITEM_DELETE))

export const itemAddEstimation = createAction(ITEM_ADD_ESTIMATION)
export const itemAddEstimationSuccess = createAction(successAction(ITEM_ADD_ESTIMATION))
export const itemAddEstimationFail = createAction(failAction(ITEM_ADD_ESTIMATION))

export const itemAddToWatchlist = createAction(ITEM_ADD_TO_WATCHLIST)
export const itemAddToWatchlistSuccess = createAction(successAction(ITEM_ADD_TO_WATCHLIST))
export const itemAddToWatchlistFail = createAction(failAction(ITEM_ADD_TO_WATCHLIST))

export const itemAddReply = createAction(ITEM_ADD_REPLY)
export const itemAddReplySuccess = createAction(successAction(ITEM_ADD_REPLY))
export const itemAddReplyFail = createAction(failAction(ITEM_ADD_REPLY))

export const clearItems = createAction(CLEAR_ITEMS)

export const reducer = handleActions(
  {
    [ITEM_LIST]: (state, { payload, type }) => ({ ...state, status: type, error: null }),

    [combineActions(ITEM_ADD, ITEM_ADD_ESTIMATION, ITEM_ADD_TO_WATCHLIST, ITEM_ADD_REPLY)]: (state, { type }) => ({
      ...state,
      status: type,
      error: null,
    }),

    [ITEM_GET]: (state, { type }) => ({ ...state, currentItem: null, status: type, error: null }),

    [successAction(ITEM_LIST)]: (state, { payload, type }) => ({ ...state, items: { ...payload }, status: type }),

    [successAction(ITEM_ADD)]: (state, { payload, type }) => ({ ...state, status: type, error: null }),

    [successAction(ITEM_GET)]: (state, { payload, type }) => ({ ...state, currentItem: payload, status: type }),

    [successAction(ITEM_ADD_ESTIMATION)]: (state, { payload, type }) => {
      const { comment, ...data } = payload
      const { currentItem } = state
      const { estimations, comments } = currentItem

      return {
        ...state,
        currentItem: {
          ...currentItem,
          estimations: [...estimations, data],
          comments: comment ? [comment, ...comments] : [...comments],
        },
        status: type,
      }
    },

    [successAction(ITEM_ADD_TO_WATCHLIST)]: (state, { payload, type }) => {
      const { currentItem } = state
      const { id, in_watchlist } = currentItem

      return {
        ...state,
        currentItem: {
          ...currentItem,
          in_watchlist: payload.item === id ? true : in_watchlist,
        },
        status: type,
      }
    },

    [successAction(ITEM_ADD_REPLY)]: (state, { payload, type }) => {
      const { currentItem } = state
      const { comments } = currentItem

      const newComments = comments.map(comment =>
        comment.id === payload.parent ? { ...comment, children: [payload, ...comment.children] } : comment,
      )

      return {
        ...state,
        currentItem: {
          ...currentItem,
          comments: [payload, ...newComments],
        },
        status: type,
      }
    },

    [combineActions(
      failAction(ITEM_LIST),
      failAction(ITEM_ADD),
      failAction(ITEM_GET),
      failAction(ITEM_ADD_ESTIMATION),
      failAction(ITEM_ADD_REPLY),
    )]: (state, { payload, type }) => ({
      ...state,
      status: type,
      error: payload.message,
    }),

    [CLEAR_ITEMS]: (state, { type }) => ({ ...state, items: { ...initialState.items }, status: type }),
    [LOCATION_CHANGE]: state => ({ ...state, error: null }),
  },
  initialState,
)
