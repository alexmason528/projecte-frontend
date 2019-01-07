import { sumBy } from 'lodash'
import { API_BASE_URL } from 'config/base'
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
