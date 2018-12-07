import React, { Component } from 'react'
import logoImg from 'assets/images/logo.png'

export default class Logo extends Component {
  render() {
    return (
      <div className="logo" {...this.props}>
        <img src={logoImg} alt="logo" style={{ width: 150 }} />
      </div>
    )
  }
}
