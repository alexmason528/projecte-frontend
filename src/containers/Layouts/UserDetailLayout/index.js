import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import cx from 'classnames'
import { Container, Row, Col, Button } from 'reactstrap'

export class UserDetailLayout extends Component {
  isActiveLink = link => {
    const { location, match } = this.props
    return location.pathname === `${match.url}/${link}`
  }

  render() {
    const { children, match } = this.props
    const pages = [
      {
        link: 'listings',
        name: 'My Listings',
      },
      {
        link: 'watchlist',
        name: 'Watchlist',
      },
      {
        link: 'notifications',
        name: 'Notifications',
      },
      {
        link: 'profile',
        name: 'Profile',
      },
    ]

    return (
      <Container>
        <Row>
          {pages.map(({ link, name }) => (
            <Col key={link} sm={12} md={3}>
              <Link to={`${match.url}/${link}`}>
                <Button className={cx('user-btn w-100', { 'active-link': this.isActiveLink(link) })}>{name}</Button>
              </Link>
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="pt-4 pb-3">{children}</Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(UserDetailLayout)
