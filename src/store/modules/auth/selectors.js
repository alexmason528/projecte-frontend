import { get } from 'lodash'

export const selectAuthStore = state => get(state, 'auth')

export const selectUserData = state => get(state, ['auth', 'user'])

export const selectIsLoggedIn = state => !!get(state, ['auth', 'user'])

export const selectAuthStatus = state => get(state, ['auth', 'status'])

export const selectAuthError = state => get(state, ['auth', 'error'])
