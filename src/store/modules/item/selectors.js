import { get } from 'lodash'

export const selectItemStore = state => get(state, 'item')

export const selectItemData = state => get(state, ['item', 'items'])

export const selectCurrentItem = state => get(state, ['item', 'currentItem'])

export const selectItemStatus = state => get(state, ['item', 'status'])

export const selectItemError = state => get(state, ['item', 'error'])
