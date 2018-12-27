import React from 'react'
import { QuarterSpinner } from 'components'

const Loader = props => (
  <div className="loader-wrapper">
    <QuarterSpinner className="loader" {...props} />
  </div>
)

export default Loader
