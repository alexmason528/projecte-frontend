import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { createStructuredSelector } from 'reselect'
import { Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { IoIosUndo, IoMdAddCircleOutline } from 'react-icons/io'
import swal from 'sweetalert'
import { find, filter, get, upperCase } from 'lodash'
import { sendVerifyEmail, setRedirectPath, selectIsLoggedIn, selectIsVerified, selectLocale } from 'store/modules/auth'
import { selectCategories, categoryFetch } from 'store/modules/category'
import VerifyEmailAlert from 'containers/VerifyEmailAlert'
import { Breadcrumbs, MainItemTable } from 'components'
import messages from 'messages'
import { getCategoryName } from 'utils/common'

export class Dashboard extends Component {
  static propTypes = {
    categories: PropTypes.array,
    history: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    isVerified: PropTypes.bool,
    locale: PropTypes.string,
    categoryFetch: PropTypes.func,
    sendVerifyEmail: PropTypes.func,
    setRedirectPath: PropTypes.func,
    intl: intlShape.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      currentItem: null,
      rootCategoryId: null,
    }
  }

  componentWillMount() {
    this.props.categoryFetch()
  }

  setCurrentItem = item => {
    this.setState({ currentItem: item })
  }

  gotoItemAddPage = item => {
    const { isLoggedIn, isVerified, intl } = this.props

    if (!isLoggedIn) {
      this.props.setRedirectPath('/add-item')
      this.props.history.push('auth')
      return
    }

    if (!isVerified) {
      swal({
        className: 'pe-swal-left',
        text: intl.formatMessage(messages.emailConfirm),
      }).then(res => {
        if (res) {
          this.props.sendVerifyEmail()
        }
      })
      return
    }

    this.props.history.push('/add-item')
  }

  renderRootCategories = () => {
    const { categories, locale } = this.props
    const { currentItem } = this.state

    const rootCategory = find(categories, { path: currentItem })
    const parentCategories = filter(categories, { parent: rootCategory.id })

    return (
      <Fragment>
        {parentCategories.map(category => (
          <div key={category.id} className="col-md-12 col-lg-6">
            <button className="pe-btn w-100 mb-3 p-3" style={{ fontSize: '1.2rem' }} onClick={() => this.rootCategoryClick(category.id)}>
              {getCategoryName(category, locale)}
            </button>
          </div>
        ))}
      </Fragment>
    )
  }

  rootCategoryClick = id => {
    const { categories } = this.props
    const hasSubCategories = filter(categories, { parent: id }).length > 0

    if (hasSubCategories) {
      this.setState({ rootCategoryId: id })
    } else {
      this.gotoItemDetailPage(id)
    }
  }

  gotoItemDetailPage = id => {
    const { currentItem, rootCategoryId } = this.state

    this.props.history.push(`/item/${currentItem}?cid=${id || rootCategoryId}`)
  }

  goBack = () => {
    this.setState({
      currentItem: null,
      rootCategoryId: null,
    })
  }

  getToggleCaption = () => {
    const { currentItem } = this.state
    const { intl } = this.props

    if (currentItem === 'real-estate') {
      return intl.formatMessage(messages.realEstateDrop)
    }

    if (currentItem === 'automobile') {
      return intl.formatMessage(messages.automobileDrop)
    }

    if (currentItem === 'art') {
      return intl.formatMessage(messages.artDrop)
    }

    return ''
  }

  renderSubCategories = () => {
    const { categories, locale } = this.props
    const { rootCategoryId } = this.state

    const subCategories = filter(categories, { parent: rootCategoryId })

    return (
      <UncontrolledDropdown className="pe-dropdown subcategory-dropdown">
        <DropdownToggle className="w-100 text-left py-2 text-uppercase font-weight-bold" style={{ fontSize: '1.2rem' }} caret>
          {this.getToggleCaption()}
        </DropdownToggle>
        {subCategories && subCategories.length > 0 && (
          <DropdownMenu className="w-100">
            <DropdownItem key="all" onClick={() => this.gotoItemDetailPage()}>
              <FormattedMessage id="estify.all" />
            </DropdownItem>
            {subCategories.map(category => (
              <DropdownItem key={category.id} onClick={() => this.gotoItemDetailPage(category.id)}>
                {getCategoryName(category, locale)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </UncontrolledDropdown>
    )
  }

  getBreadcrumbPath = () => {
    const { categories } = this.props
    const { currentItem, rootCategoryId } = this.state

    if (!rootCategoryId) {
      return currentItem
    }

    return get(find(categories, { id: rootCategoryId }), 'path')
  }

  render() {
    const { categories, intl } = this.props
    const { currentItem, rootCategoryId } = this.state
    const { formatMessage } = intl

    if (!categories || !categories.length) {
      return null
    }

    if (!currentItem) {
      return (
        <div className="dashboard">
          <Row>
            <Col md={12}>
              <VerifyEmailAlert />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6} />
            <Col md={6}>
              <button className="pe-btn add-item-btn w-100 text-left p-2" onClick={this.gotoItemAddPage}>
                <IoMdAddCircleOutline style={{ fontSize: '2.5rem', marginTop: -3, marginRight: '0.5rem' }} />
                {formatMessage(messages.addItemForEstimation)}
              </button>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <MainItemTable onClick={this.setCurrentItem} />
            </Col>
          </Row>
        </div>
      )
    }

    return (
      <MediaQuery minDeviceWidth={768}>
        {matches => {
          return (
            <div className="dashboard">
              <Breadcrumbs path={this.getBreadcrumbPath()} listClassName="p-0 bg-transparent" />
              <div className="row">
                <div className="col-12">
                  <h3 className="text-center color-primary position-relative font-weight-bold mt-2">
                    {upperCase(currentItem)}
                    <button className="pe-btn px-1 py-0 pos-center-y" style={{ right: 0 }} onClick={this.goBack}>
                      <IoIosUndo style={{ fontSize: '1rem' }} />
                    </button>
                  </h3>
                </div>
                {this.renderRootCategories()}
              </div>
              {rootCategoryId && (
                <div className="row mx-auto" style={{ width: matches ? 400 : 'auto' }}>
                  <div className="w-100">{this.renderSubCategories()}</div>
                </div>
              )}
            </div>
          )
        }}
      </MediaQuery>
    )
  }
}

const selectors = createStructuredSelector({
  categories: selectCategories,
  locale: selectLocale,
  isLoggedIn: selectIsLoggedIn,
  isVerified: selectIsVerified,
})

const actions = {
  categoryFetch,
  sendVerifyEmail,
  setRedirectPath,
}

export default compose(
  injectIntl,
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(Dashboard)
