import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

import 'polyfills/localStorage'
import { store } from 'store'
import Routes from 'routes'
import { getItem } from 'utils/storage'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles/core.scss'

/* Set up axios request interceptor for adding authorization header */

axios.interceptors.request.use(config => {
  const auth = JSON.parse(getItem('auth') || null)
  if (auth) {
    config.headers['Authorization'] = `JWT ${auth.token}`
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
