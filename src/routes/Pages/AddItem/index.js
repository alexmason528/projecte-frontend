import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { MainCategory } from 'components'

class AddItemPage extends Component {
  handleCategoryClick = category => {
    this.props.history.push(`${category}/new`)
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <h3 className="pe-heading text-center">What do you want to add?</h3>
        </Col>
        <Col md={12}>
          <MainCategory onClick={this.handleCategoryClick} />
        </Col>
      </Row>
    )
  }
}

export default withRouter(AddItemPage)
