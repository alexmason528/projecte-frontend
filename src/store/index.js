import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { all } from 'redux-saga/effects'
import authMiddleware from 'store/middlewares/auth'
import { reducer as authReducer, saga as authSaga } from 'store/modules/auth'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Redux-saga middleware
const sagaMiddleware = createSagaMiddleware()

const middlewares = [middleware, sagaMiddleware, authMiddleware]

const enhancers = [applyMiddleware(...middlewares)]

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
/* eslint-enable */

export const store = createStore(
  combineReducers({
    auth: authReducer,
    form: formReducer,
  }),
  composeEnhancers(...enhancers),
)

// Run saga middleware
sagaMiddleware.run(function* rootSaga() {
  yield all([authSaga()])
})
