import { sumBy } from 'lodash'

export function getEstimation(estimations) {
  if (estimations.length === 0) {
    return 0
  }

  return sumBy(estimations, 'value') / estimations.length
}
