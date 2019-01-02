import React, { Fragment } from 'react'
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
    content: (
      <Fragment>
        Estimation <MdExpandMore />
      </Fragment>
    ),
  },
  {
    id: 'price',
    content: (
      <Fragment>
        Estimation <MdExpandLess />
      </Fragment>
    ),
  },
  {
    id: '-estimation',
    content: (
      <Fragment>
        Number of Estimations <MdExpandMore />
      </Fragment>
    ),
  },
  {
    id: 'estimation',
    content: (
      <Fragment>
        Number of Estimations <MdExpandLess />
      </Fragment>
    ),
  },
  {
    id: '-date',
    content: (
      <Fragment>
        Most Recent Listings
        <MdExpandMore />
      </Fragment>
    ),
  },
]
