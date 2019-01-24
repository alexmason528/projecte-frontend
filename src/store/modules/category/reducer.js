import { createAction, handleActions } from 'redux-actions'
import { LOCATION_CHANGE } from 'connected-react-router'
import { successAction, failAction } from 'utils/state-helpers'

import { CATEGORY_FETCH } from './constants'

/* Inital state */

const initialState = {
  categories: [],
  allCategories: [],
  status: null,
  error: null,
}

/* Action creators */

export const categoryFetch = createAction(CATEGORY_FETCH)
export const categoryFetchSuccess = createAction(successAction(CATEGORY_FETCH))
export const categoryFetchFail = createAction(failAction(CATEGORY_FETCH))

export const reducer = handleActions(
  {
    [CATEGORY_FETCH]: (state, { type }) => ({ ...state, status: type, error: null }),

    [successAction(CATEGORY_FETCH)]: (state, { payload, type }) => ({ ...state, categories: payload, status: type, error: null }),

    [failAction(CATEGORY_FETCH)]: (state, { payload, type }) => ({ ...state, status: type, error: payload.message }),

    [LOCATION_CHANGE]: state => ({ ...state, error: null }),
  },
  initialState,
)
