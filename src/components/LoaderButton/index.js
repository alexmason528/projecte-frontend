import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { QuarterSpinner } from 'components'

export default class LoaderButton extends Component {
  render() {
    const { loading, children, spinner, ...props } = this.props

    return (
      <Button {...props} disabled={loading}>
        {loading && <QuarterSpinner className="mr-2" width={16} height={16} fill="white" {...spinner} />}
        {children}
      </Button>
    )
  }
}
