import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { Alert, Button, Row, Col } from 'reactstrap'
import { find, slice } from 'lodash'
import numeral from 'numeral'
import moment from 'moment'
import swal from 'sweetalert'
import { MdStar, MdSearch } from 'react-icons/md'
import { FaCoins } from 'react-icons/fa'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { selectUserData, selectAuthStatus, AUTH_LOGIN } from 'store/modules/auth'
import {
  itemGet,
  itemAddEstimation,
  itemAddToWatchlist,
  itemAddReply,
  selectCurrentItem,
  selectItemStatus,
  selectItemError,
  ITEM_GET,
  ITEM_ADD_TO_WATCHLIST,
} from 'store/modules/item'
import { categoryFetch } from 'store/modules/category'
import { Loader, QuarterSpinner, Breadcrumbs, UserDetail, Desktop, Tablet, TabletOrMobile, Mobile } from 'components'
import { getEstimation, getURL } from 'utils/common'
import { successAction, failAction } from 'utils/state-helpers'
import ItemFact from './Elements/Fact'
import ItemComments from './Elements/Comments'
import EstimationModal from './Modals/Estimation'
import ReplyModal from './Modals/Reply'
import AuthModal from './Modals/Auth'
import ImageSliderModal from './Modals/ImageSlider'
import messages from 'messages'

export class ItemDetailPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    type: PropTypes.string,
    item: PropTypes.object,
    status: PropTypes.string,
    authStatus: PropTypes.string,
    error: PropTypes.string,
    itemGet: PropTypes.func,
    itemAddEstimation: PropTypes.func,
    itemAddToWatchlist: PropTypes.func,
    itemAddReply: PropTypes.func,
    categoryFetch: PropTypes.func,
    intl: intlShape.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isEstimationModalOpen: false,
      isReplyModalOpen: false,
      isAuthModalOpen: false,
      isImageSliderOpen: false,
      selectedComment: null,
      modalAfterLoginSuccess: null,
    }
  }

  componentWillMount() {
    const { type, match } = this.props

    this.props.itemGet({ type, slug: match.params.slug })
    this.props.categoryFetch()
  }

  componentWillReceiveProps(nextProps) {
    const { authStatus, status, intl } = this.props

    if (status === ITEM_ADD_TO_WATCHLIST && nextProps.status !== status) {
      const success = nextProps.status === successAction(ITEM_ADD_TO_WATCHLIST)

      swal({
        className: 'pe-swal',
        text: success ? intl.formatMessage(messages.addItemToWatchlistSuccess) : nextProps.error,
      })
    }

    if (authStatus === AUTH_LOGIN && nextProps.authStatus !== authStatus) {
      const { modalAfterLoginSuccess } = this.state
      const { item, user } = nextProps

      if (nextProps.authStatus === successAction(AUTH_LOGIN) && modalAfterLoginSuccess && this.canGiveEstimation(item, user)) {
        this.setState({ [modalAfterLoginSuccess]: true, modalAfterLoginSuccess: null })
      }
    }
  }

  handleToggleModal = name => {
    this.setState({ [name]: !this.state[name] })
  }

  handleGiveEstimate = () => {
    const { user } = this.props

    if (!user) {
      this.setState({ isAuthModalOpen: true, modalAfterLoginSuccess: 'isEstimationModalOpen' })
      return
    }

    this.handleToggleModal('isEstimationModalOpen')
  }

  handleAddEstimation = values => {
    const { type, item } = this.props

    const data = { ...values, item: item.id }
    this.props.itemAddEstimation({ type, slug: item.slug, data })
  }

  handleAddToWatchList = () => {
    const { user, item } = this.props

    if (!user) {
      this.setState({ isAuthModalOpen: true })
      return
    }

    this.props.itemAddToWatchlist(item.id)
  }

  handleOpenReplyModal = id => {
    const { user } = this.props

    if (!user) {
      this.handleToggleModal('isAuthModalOpen')
      return
    }

    this.setState({ selectedComment: id, isReplyModalOpen: true })
  }

  handleAddReply = values => {
    const { type, item } = this.props
    const { selectedComment } = this.state
    const data = { ...values, item: item.id, parent: selectedComment }

    this.props.itemAddReply({ type, slug: item.slug, data })
  }

  canGiveEstimation(item, user) {
    if (user && user.id === item.user.id) {
      return false
    }

    if (user && find(item.estimations, { user: user.id })) {
      return false
    }

    return true
  }

  render() {
    const { item, type, status, error } = this.props
    const { isEstimationModalOpen, isReplyModalOpen, isAuthModalOpen, isImageSliderOpen } = this.state

    const loading = status === ITEM_GET

    if (loading) {
      return <Loader />
    } else if (status === failAction(ITEM_GET) && error) {
      return <Alert color="danger">{error}</Alert>
    } else if (!item) {
      return null
    }

    const { name, estimations, comments, details, facts, images, date, in_watchlist, user } = item

    const mainThumb = images[0]
    const thumbs = slice(images, 1, 5)

    const addingToWatchlist = status === ITEM_ADD_TO_WATCHLIST

    return (
      <div className="item-detail-page">
        <EstimationModal
          isOpen={isEstimationModalOpen}
          toggle={() => this.handleToggleModal('isEstimationModalOpen')}
          status={status}
          error={error}
          onSubmit={this.handleAddEstimation}
        />
        <ReplyModal
          isOpen={isReplyModalOpen}
          toggle={() => this.handleToggleModal('isReplyModalOpen')}
          status={status}
          error={error}
          onSubmit={this.handleAddReply}
        />
        <AuthModal isOpen={isAuthModalOpen} toggle={() => this.handleToggleModal('isAuthModalOpen')} />

        <ImageSliderModal isOpen={isImageSliderOpen} images={images} toggle={() => this.handleToggleModal('isImageSliderOpen')} />
        <Breadcrumbs path={item.category.path} className="mb-4" listClassName="p-0 pb-2 bg-transparent" />

        <Desktop>
          <Row>
            <Col md={6}>
              <h3 className="my-0 text-uppercase">{name}</h3>
            </Col>
            <Col md={6} className="text-right">
              {!in_watchlist && (
                <Button className="pe-btn p-2" onClick={this.handleAddToWatchList} disabled={addingToWatchlist}>
                  {addingToWatchlist ? <QuarterSpinner width={32} height={32} fill="white" /> : <MdStar style={{ fontSize: '2rem' }} />}
                </Button>
              )}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={9} className="position-relative">
              <Row className="item-images -my-2">
                <Col md={6} className="py-2">
                  <div
                    className="item-main-thumb screen-desktop w-100"
                    style={{ backgroundImage: `url("${getURL(mainThumb.obj)}")`, height: '100%', backgroundSize: 'cover' }}
                    onClick={() => this.handleToggleModal('isImageSliderOpen')}
                  >
                    <Button className="pe-btn p-1 item-thumb-magnify">
                      <MdSearch style={{ fontSize: '2rem' }} />
                    </Button>
                  </div>
                </Col>
                <Col md={6}>
                  <Row>
                    {thumbs.map((image, ind) => (
                      <Col className="item-image pl-0 py-2" key={image.id} md={6}>
                        <div
                          className="item-thumb w-100"
                          style={{ backgroundImage: `url("${getURL(image.obj)}")` }}
                          onClick={() => this.handleToggleModal('isImageSliderOpen')}
                        >
                          {ind === 3 && images.length > 5 && <div className="item-image-more">+{images.length - 5}</div>}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>

              <div className="item-fact pe-box p-4 mt-3 position-relative">
                <div className="row">
                  <div className="col-8">
                    <h3 className="text-uppercase font-weight-bold mt-0 mb-3">
                      <FormattedMessage id="estify.facts" />
                    </h3>
                  </div>
                  <div className="col-4 text-right">
                    <FormattedMessage id="estify.listingDate" />: {moment(date).format('DD.MM.YYYY')}
                  </div>
                </div>

                <ItemFact type={type} facts={facts} />
              </div>

              <div className="item-details pe-box p-4 mt-3">
                <h3 className="mt-0 mb-3 text-uppercase font-weight-bold">
                  <FormattedMessage id="estify.details" />
                </h3>
                <div className="pe-textarea" dangerouslySetInnerHTML={{ __html: details }} />
              </div>

              <div className="item-comments pe-box p-4 mt-3">
                <h3 className="mt-0 mb-3 text-uppercase font-weight-bold">
                  <FormattedMessage id="estify.comments" />
                </h3>
                {comments.length > 0 ? (
                  <ItemComments comments={comments} addReply={this.handleOpenReplyModal} />
                ) : (
                  <FormattedMessage id="estify.noCommentsYet" />
                )}
              </div>
            </Col>
            <Col md={3} className="right-panel text-uppercase font-weight-bold" style={{ fontSize: '1.3rem' }}>
              {this.canGiveEstimation(item, this.props.user) && (
                <Button className="pe-btn w-100 mb-3" onClick={this.handleGiveEstimate}>
                  <FormattedMessage id="estify.giveEstimate" />
                </Button>
              )}
              <div className="pe-box mb-3 p-3">
                <div>
                  <FormattedMessage id="estify.estimation" />
                </div>
                <div className="text-right">
                  <FormattedMessage id="estify.currency" /> {numeral(getEstimation(estimations)).format('0,0[.]00')}
                </div>
              </div>
              <div className="pe-box p-3">
                <div className="mb-2">
                  <FormattedMessage id="estify.infos" />
                </div>
                <div className="text-capitalize font-weight-normal" style={{ fontSize: '1rem' }}>
                  <FormattedMessage id="estify.estimations" />: {numeral(estimations.length).format('0,0')}
                  <br />
                  <FormattedMessage id="estify.comments" />: {numeral(comments.length).format('0,0')}
                  <br />
                </div>
                <div className="item-lister mt-3">
                  <div className="mb-2">
                    <FormattedMessage id="estify.lister" />
                  </div>
                  <UserDetail user={user} isLister />
                </div>
              </div>
            </Col>
          </Row>
        </Desktop>

        <Tablet>
          <div style={{ fontSize: '1.3rem' }}>
            <Row>
              <Col className="col-6">
                <h3 className="my-0 text-uppercase">{name}</h3>
              </Col>
              <Col className="col-6 text-right">
                {!in_watchlist && (
                  <Button className="pe-btn p-2" onClick={this.handleAddToWatchList} disabled={addingToWatchlist}>
                    {addingToWatchlist ? <QuarterSpinner width={32} height={32} fill="white" /> : <MdStar style={{ fontSize: '2rem' }} />}
                  </Button>
                )}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="col-6">
                <div
                  className="item-main-thumb w-100"
                  style={{ backgroundImage: `url("${getURL(mainThumb.obj)}")`, height: '100%', backgroundSize: 'cover' }}
                  onClick={() => this.handleToggleModal('isImageSliderOpen')}
                >
                  <Button className="pe-btn p-1 item-thumb-magnify">
                    <MdSearch style={{ fontSize: '2rem' }} />
                  </Button>
                </div>
              </Col>
              <Col className="col-6">
                {this.canGiveEstimation(item, this.props.user) && (
                  <Button className="pe-btn w-100 mb-3" onClick={this.handleGiveEstimate}>
                    <FormattedMessage id="estify.giveEstimate" />
                  </Button>
                )}
                <div className="pe-box mb-3 p-3 d-flex justify-content-between font-weight-bold">
                  <div>EST.</div>
                  <div>$ {numeral(getEstimation(estimations)).format('0,0[.]00')}</div>
                </div>
                <div className="pe-box p-3">
                  <div className="font-weight-bold">
                    <FormattedMessage id="estify.infos" />
                  </div>
                  <div className="text-capitalize font-weight-normal">
                    <FormattedMessage id="estify.estimations" />: {numeral(estimations.length).format('0,0')}
                    <br />
                    <FormattedMessage id="estify.comments" />: {numeral(comments.length).format('0,0')}
                    <br />
                  </div>
                  <div className="item-lister mt-3">
                    <div className="mb-2 font-weight-bold">
                      <FormattedMessage id="estify.lister" />
                    </div>
                    <UserDetail user={user} isLister />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Tablet>

        <Mobile>
          <div style={{ fontSize: '1rem' }}>
            <Row>
              <Col className="d-flex align-items-center justify-content-between">
                <h3 className="my-0 text-uppercase">{name}</h3>
                <div>
                  {this.canGiveEstimation(item, this.props.user) && (
                    <Button className="pe-btn p-1 ml-2" onClick={this.handleGiveEstimate}>
                      <FaCoins style={{ fontSize: '1.5rem' }} />
                    </Button>
                  )}
                  {!in_watchlist && (
                    <Button className="pe-btn p-1 ml-2" onClick={this.handleAddToWatchList} disabled={addingToWatchlist}>
                      {addingToWatchlist ? (
                        <QuarterSpinner width={32} height={32} fill="white" />
                      ) : (
                        <MdStar style={{ fontSize: '1.5rem' }} />
                      )}
                    </Button>
                  )}
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col className="col-6">
                <div
                  className="item-main-thumb w-100"
                  style={{ backgroundImage: `url("${getURL(mainThumb.obj)}")`, height: '100%', backgroundSize: 'cover' }}
                  onClick={() => this.handleToggleModal('isImageSliderOpen')}
                >
                  <Button className="pe-btn p-1 item-thumb-magnify">
                    <MdSearch style={{ fontSize: '2rem' }} />
                  </Button>
                </div>
              </Col>
              <Col className="col-6 pl-0">
                <div className="pe-box mb-2 p-2 font-weight-bold">
                  <div className="text-uppercase">
                    <FormattedMessage id="estify.estimation" />
                  </div>
                  <div className="text-right">
                    <FormattedMessage id="estify.currency" /> {numeral(getEstimation(estimations)).format('0,0[.]00')}
                  </div>
                </div>
                <div className="pe-box p-2">
                  <div className="font-weight-bold">
                    <FormattedMessage id="estify.infos" />
                  </div>
                  <div className="text-capitalize font-weight-normal">
                    <FormattedMessage id="estify.estimations" />: {numeral(estimations.length).format('0,0')}
                    <br />
                    <FormattedMessage id="estify.comments" />: {numeral(comments.length).format('0,0')}
                    <br />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Mobile>

        <TabletOrMobile>
          <Row className="mt-3">
            <Col className="col-12">
              <div className="item-fact pe-box p-4 position-relative">
                <div className="row">
                  <div className="col-12">
                    <h3 className="text-uppercase font-weight-bold m-0">
                      <FormattedMessage id="estify.facts" />
                    </h3>
                  </div>
                  <div className="col-12 mb-3">
                    <FormattedMessage id="estify.listingDate" />: {moment(date).format('DD.MM.YYYY')}
                  </div>
                </div>
                <ItemFact type={type} facts={facts} />
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-12">
              <div className="item-details pe-box p-4">
                <h3 className="mt-0 mb-3 text-uppercase font-weight-bold">
                  <FormattedMessage id="estify.details" />
                </h3>
                <div className="pe-textarea" dangerouslySetInnerHTML={{ __html: details }} />
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-12">
              <div className="item-comments pe-box p-4">
                <h3 className="mt-0 mb-3 text-uppercase font-weight-bold">
                  <FormattedMessage id="estify.comments" />
                </h3>
                {comments.length > 0 ? (
                  <ItemComments comments={comments} addReply={this.handleOpenReplyModal} />
                ) : (
                  <FormattedMessage id="estify.noCommentsYet" />
                )}
              </div>
            </Col>
          </Row>
        </TabletOrMobile>
      </div>
    )
  }
}

const selectors = createStructuredSelector({
  user: selectUserData,
  item: selectCurrentItem,
  status: selectItemStatus,
  authStatus: selectAuthStatus,
  error: selectItemError,
})

const actions = {
  itemGet,
  itemAddEstimation,
  itemAddToWatchlist,
  itemAddReply,
  categoryFetch,
}

export default compose(
  injectIntl,
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(ItemDetailPage)
