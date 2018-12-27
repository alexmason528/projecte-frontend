import React, { Fragment } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

export const AUTH_DATA = 'projecte/auth/data'

export const API_BASE_URL = process.env.API_BASE_URL

export const REAL_ESTATE = 'real-estate'

export const AUTOMOBILE = 'automobile'

export const ART = 'art'

export const VALUABLE = 'valuable'

export const MAIN_ITEM_TYPES = [REAL_ESTATE, AUTOMOBILE, ART, VALUABLE]

export const ORDERING_CONSTS = {
  '-price': (
    <Fragment>
      Price <MdExpandMore />
    </Fragment>
  ),
  price: (
    <Fragment>
      Price <MdExpandLess />
    </Fragment>
  ),
  '-estimation': (
    <Fragment>
      Estimation <MdExpandMore />
    </Fragment>
  ),
  estimation: (
    <Fragment>
      Estimation <MdExpandLess />
    </Fragment>
  ),
  '-date': (
    <Fragment>
      Most Recent <MdExpandMore />
    </Fragment>
  ),
}
