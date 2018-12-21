import { createAction, handleActions, combineActions } from 'redux-actions'
import { LOCATION_CHANGE } from 'react-router-redux'
import { successAction, failAction } from 'utils/state-helpers'

import { ITEM_ADD, ITEM_LIST } from './constants'

/* Inital state */

const initialState = {
  item: {
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

export const itemAdd = createAction(ITEM_ADD)
export const itemAddSuccess = createAction(successAction(ITEM_ADD))
export const itemAddFail = createAction(failAction(ITEM_ADD))

export const itemList = createAction(ITEM_LIST)
export const itemListSuccess = createAction(successAction(ITEM_LIST))
export const itemListFail = createAction(failAction(ITEM_LIST))

export const reducer = handleActions(
  {
    [ITEM_ADD]: (state, { type }) => ({ ...state, status: type, error: null }),

    [ITEM_LIST]: (state, { payload, type }) =>
      Object.assign(
        { ...state, currentItem: payload.name, status: type, error: null },
        state.currentItem !== payload.name && { item: { ...initialState.item } },
      ),

    [successAction(ITEM_ADD)]: (state, { payload, type }) => ({ ...state, status: type, error: null }),

    [successAction(ITEM_LIST)]: (state, { payload, type }) => ({ ...state, item: { ...payload }, status: type }),

    [combineActions(failAction(ITEM_ADD), failAction(ITEM_LIST))]: (state, { payload, type }) => ({
      ...state,
      status: type,
      error: payload,
    }),

    [LOCATION_CHANGE]: state => ({ ...state, error: null }),
  },
  initialState,
)
