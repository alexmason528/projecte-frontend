import { validatorFactory } from 'utils/redux-form'

const schema = {
  name: {
    presence: true,
  },
  living_space: {
    presence: true,
    numericality: true,
  },
  years_of_cons: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 1600,
      lessThanOrEqualTo: 2050,
    },
  },
  building_area: {
    presence: true,
    numericality: true,
  },
  condition: {
    presence: true,
  },
  artist: {
    presence: true,
  },
  year: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 1600,
      lessThanOrEqualTo: 2050,
    },
  },
  fuel: {
    presence: true,
  },
  miles: {
    presence: true,
    numericality: true,
  },
  color: {
    presence: true,
  },
  material: {
    presence: true,
  },
  weight: {
    presence: true,
    numericality: true,
  },
  details: {
    presence: true,
  },
}

export default validatorFactory(schema)
