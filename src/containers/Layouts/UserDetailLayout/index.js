import React, { Component } from 'react'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { injectIntl, intlShape } from 'react-intl'
import { Row, Col, Button } from 'reactstrap'
import cx from 'classnames'
import messages from 'messages'

export class UserDetailLayout extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  isActiveLink = link => {
    const { location, match } = this.props
    return location.pathname === `${match.url}/${link}`
  }

  render() {
    const { children, match, intl } = this.props
    const { formatMessage } = intl
    const pages = [
      {
        link: 'listings',
        name: formatMessage(messages.myListings),
      },
      {
        link: 'watchlist',
        name: formatMessage(messages.watchlist),
      },
      {
        link: 'profile',
        name: formatMessage(messages.profile),
      },
    ]

    return (
      <div>
        <Row className="profile-nav">
          {pages.map(({ link, name }) => (
            <Col key={link} sm={12} md={4} className="profile-nav-item">
              <Link to={`${match.url}/${link}`}>
                <Button className={cx('user-btn w-100', { 'active-link': this.isActiveLink(link) })}>{name}</Button>
              </Link>
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="pt-4 pb-3">{children}</Col>
        </Row>
      </div>
    )
  }
}

export default compose(
  injectIntl,
  withRouter,
)(UserDetailLayout)
