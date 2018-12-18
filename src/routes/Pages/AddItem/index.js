import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { MainItemTable } from 'components'

class AddItemPage extends Component {
  handleItemClick = name => {
    this.props.history.push(`/item/${name}/new`)
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <h3 className="pe-heading text-center mt-3" style={{ marginBottom: '1.65rem' }}>
            What do you want to add?
          </h3>
        </Col>
        <Col md={12}>
          <MainItemTable onClick={this.handleItemClick} />
        </Col>
      </Row>
    )
  }
}

export default withRouter(AddItemPage)
