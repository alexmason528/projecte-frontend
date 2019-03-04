import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { MainItemTable } from 'components'

class AddItemPage extends Component {
  handleItemClick = name => {
    this.props.history.push(`/item/${name}/new`)
  }

  render() {
    return (
      <Row className="item-add-page">
        <Col md={12}>
          <h3 className="pe-heading text-center mt-3" style={{ marginBottom: '1.8rem' }}>
            <FormattedMessage id="estify.wantAdd" />
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
