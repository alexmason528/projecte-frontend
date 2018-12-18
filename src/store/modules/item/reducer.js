import { createAction, handleActions } from 'redux-actions'
import { LOCATION_CHANGE } from 'react-router-redux'
import { successAction, failAction } from 'utils/state-helpers'

import { ITEM_ADD } from './constants'

/* Inital state */

const initialState = {
  items: [],
  status: null,
  error: null,
}

/* Action creators */

export const itemAdd = createAction(ITEM_ADD)
export const itemAddSuccess = createAction(successAction(ITEM_ADD))
export const itemAddFail = createAction(failAction(ITEM_ADD))

export const reducer = handleActions(
  {
    [ITEM_ADD]: (state, { type }) => ({ ...state, status: type, error: null }),

    [successAction(ITEM_ADD)]: (state, { payload, type }) => ({ ...state, status: type, error: null }),

    [failAction(ITEM_ADD)]: (state, { payload, type }) => ({ ...state, status: type, error: payload }),

    [LOCATION_CHANGE]: state => {
      console.log('changed location')
      return { ...state, error: null }
    },
  },
  initialState,
)
