import React, { Component } from 'react'
import ProfileForm from 'components/Forms/ProfileForm'
import UserStats from 'components/UserStats'
import { Row, Col } from 'reactstrap'

export class Profile extends Component {
  handleSubmit = values => {
    console.log(values)
  }

  render() {
    return (
      <Row>
        <Col sm={12}>
          <ProfileForm onSubmit={this.handleSubmit} />
        </Col>
        <Col sm={12} className="mt-4">
          <UserStats />
        </Col>
      </Row>
    )
  }
}

export default Profile
