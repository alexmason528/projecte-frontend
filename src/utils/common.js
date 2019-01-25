import { find, filter, forEach, keys, get, sumBy, isEqual } from 'lodash'
import qs from 'query-string'
import { API_BASE_URL, USER_RANK } from 'config/base'
import UserPic from 'assets/images/profile.png'

export function getEstimation(estimations) {
  if (estimations.length === 0) {
    return 0
  }

  return sumBy(estimations, 'value') / estimations.length
}

export function getURL(url) {
  return url.indexOf('http') === -1 ? `${API_BASE_URL}${url}` : url
}

export function getUserPhotoUrl(photo) {
  return photo ? getURL(photo) : UserPic
}

export function getUserRank(estimation_count) {
  for (let rank of USER_RANK) {
    const { min, max, value } = rank

    if ((min && min > estimation_count) || (max && max < estimation_count)) {
      continue
    }

    return value
  }
}

export function getUserEmblem(accuracy) {
  const diff = 100 - accuracy

  let emblem

  if (diff <= 2.5) {
    emblem = 'gold'
  } else if (diff <= 5) {
    emblem = 'silver'
  } else if (diff <= 10) {
    emblem = 'bronze'
  }

  return emblem
}

export function getItemListingPagePath(type, search, categories) {
  if (!search) {
    return type
  }

  const { cid } = qs.parse(search)

  if (!cid) {
    return type
  }

  return get(find(categories, { id: parseInt(cid) }), 'path')
}

export function getChangedFields(origin, update) {
  let payload = {}
  forEach(keys(update), key => {
    if (!isEqual(get(origin, key), get(update, key))) {
      payload[key] = update[key]
    }
  })

  return payload
}

export function getMainItemTypes(categories) {
  return filter(categories, { parent: null })
}

export function getCategoryName(category, locale) {
  return get(category, ['translation', locale]) || category.name
}
