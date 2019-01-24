import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import axios from 'axios'

import 'polyfills/localStorage'
import { store, history } from 'store'
import Routes from 'routes'
import LanguageProvider from 'containers/LanguageProvider'
import { getAuthData } from 'utils/storage'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles/core.scss'

import { translationMessages } from './i18n'

/* Set up axios request interceptor for adding authorization header */

axios.interceptors.request.use(config => {
  const authData = getAuthData()
  if (authData) {
    config.headers['Authorization'] = `JWT ${authData.token}`
  }
  return config
})


const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    document.getElementById('root')
  )
}

if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages)
  })
}

render(translationMessages)
