import React, { Component } from 'react'

export default class Logo extends Component {
  render() {
    return (
      <div className="logo" {...this.props}>
        <img src="../../assets/images/logo.png" alt="logo" style={{ width: 150 }} />
      </div>
    )
  }
}
