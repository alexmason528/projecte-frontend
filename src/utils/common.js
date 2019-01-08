import { sumBy } from 'lodash'
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

export function findCategory(categories, path) {
  for (let category of categories) {
    if (category.path === path) {
      return category.id
    }

    const { children } = category
    for (let child of children) {
      if (child.path === path) {
        return child.id
      }
    }
  }
}
