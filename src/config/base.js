import React from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

export const AUTH_DATA = 'projecte/auth/data'

export const API_BASE_URL = process.env.API_BASE_URL

export const REAL_ESTATE = 'real-estate'

export const AUTOMOBILE = 'automobile'

export const ART = 'art'

export const VALUABLE = 'valuable'

export const MAIN_ITEM_TYPES = [REAL_ESTATE, AUTOMOBILE, ART, VALUABLE]

export const ORDERING_CONSTS = [
  {
    id: '-price',
    icon: <MdExpandMore />,
    text: 'estify.estimation',
  },
  {
    id: 'price',
    icon: <MdExpandLess />,
    text: 'estify.estimation',
  },
  {
    id: '-estimation',
    icon: <MdExpandMore />,
    text: 'estify.numberOfEstimations',
  },
  {
    id: 'estimation',
    icon: <MdExpandLess />,
    text: 'estify.numberOfEstimations',
  },
  {
    id: '-date',
    icon: <MdExpandMore />,
    text: 'estify.mostRecentListings',
  },
]

export const USER_RANK = [
  {
    min: null,
    max: 50,
    value: 'estify.newbie',
  },
  {
    min: 51,
    max: 200,
    value: 'estify.junior',
  },
  {
    min: 201,
    max: 500,
    value: 'estify.senior',
  },
  {
    min: 501,
    max: 1000,
    value: 'estify.estimationKing',
  },
  {
    min: 1001,
    max: null,
    value: 'estify.ultimateEstimator',
  },
]
