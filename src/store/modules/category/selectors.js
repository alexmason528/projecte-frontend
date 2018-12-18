import { get } from 'lodash'

export const selectCategoryStore = state => get(state, 'category')

export const selectCategories = state => get(state, ['category', 'categories'])

export const selectCategoryStatus = state => get(state, ['category', 'status'])

export const selectCategoryError = state => get(state, ['category', 'error'])
