import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import axios from 'axios'

import 'polyfills/localStorage'
import { store, history } from 'store'
import Routes from 'routes'
import { getAuthData } from 'utils/storage'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles/core.scss'

/* Set up axios request interceptor for adding authorization header */

axios.interceptors.request.use(config => {
  const authData = getAuthData()
  if (authData) {
    config.headers['Authorization'] = `JWT ${authData.token}`
  }
  return config
})

/* Render app components */
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
