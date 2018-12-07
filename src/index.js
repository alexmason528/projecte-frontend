import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

import 'polyfills/localStorage'
import { store } from 'store'
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
    <Routes />
  </Provider>,
  document.getElementById('root'),
)
