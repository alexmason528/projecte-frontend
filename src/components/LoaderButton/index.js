import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { QuarterSpinner } from 'components'

export default class LoaderButton extends Component {
  render() {
    const { loading, children, ...props } = this.props

    return (
      <Button {...props} disabled={loading}>
        {loading && <QuarterSpinner className="mr-2" style={{ width: 30, fill: 'white' }} />}
        {children}
      </Button>
    )
  }
}
