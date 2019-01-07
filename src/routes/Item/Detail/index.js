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
import { selectUserData } from 'store/modules/auth'
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
import { Loader, QuarterSpinner, Breadcrumbs } from 'components'
import { MAIN_ITEM_TYPES } from 'config/base'
import { getEstimation, getURL, getUserPhotoUrl } from 'utils/common'
import { successAction, failAction } from 'utils/state-helpers'
import ItemFact from './Fact'
import ItemComment from './Comment'
import EstimationModal from './Modals/Estimation'
import ReplyModal from './Modals/Reply'
import AuthModal from './Modals/Auth'
import ImageSliderModal from './Modals/ImageSlider'

export class ItemDetailPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    type: PropTypes.oneOf(MAIN_ITEM_TYPES),
    item: PropTypes.object,
    status: PropTypes.string,
    error: PropTypes.string,
    itemGet: PropTypes.func,
    itemAddEstimation: PropTypes.func,
    itemAddToWatchlist: PropTypes.func,
    itemAddReply: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      isEstimationModalOpen: false,
      isReplyModalOpen: false,
      isAuthModalOpen: false,
      isImageSliderOpen: false,
      selectedComment: null,
    }
  }

  componentWillMount() {
    const { type, match } = this.props

    this.props.itemGet({ type, id: match.params.id })
  }

  componentWillReceiveProps(nextProps) {
    const { status } = this.props

    if (status === ITEM_ADD_TO_WATCHLIST && nextProps.status !== status) {
      const success = nextProps.status === successAction(ITEM_ADD_TO_WATCHLIST)

      swal({
        className: 'pe-swal',
        text: success ? 'This item is added to the watchlist successfully' : nextProps.error,
      })
    }
  }

  handleToggleModal = name => {
    this.setState({ [name]: !this.state[name] })
  }

  handleGiveEstimate = () => {
    const { user } = this.props

    if (!user) {
      this.handleToggleModal('isAuthModalOpen')
      return
    }

    this.handleToggleModal('isEstimationModalOpen')
  }

  handleAddEstimation = values => {
    const { type, item } = this.props

    const data = { ...values, item: item.id }
    this.props.itemAddEstimation({ type, id: item.id, data })
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
    this.props.itemAddReply({ type, id: item.id, data })
  }

  gotoPublicUserPage = id => {
    this.props.history.push(`/user/${id}`)
  }

  get canGiveEstimation() {
    const { item, user } = this.props

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
        <Breadcrumbs path={`${item.category.path}.${item.name}`} className="mb-4" listClassName="px-0 bg-transparent" />
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
                  className="item-main-thumb w-100"
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
                      <div className="item-thumb w-100" style={{ backgroundImage: `url("${getURL(image.obj)}")` }}>
                        {ind === 3 && images.length > 5 && <div className="item-image-more">+{images.length - 5}</div>}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>

            <div className="item-fact pe-box p-4 mt-3 position-relative">
              <h3 className="mt-0 mb-3 text-uppercase font-weight-bold">Facts</h3>
              <ItemFact type={type} facts={facts} />
              <div className="item-listing-date">Listing date: {moment(date).format('DD.MM.YYYY')}</div>
            </div>

            <div className="item-details pe-box p-4 mt-3">
              <h3 className="mt-0 mb-3 text-uppercase font-weight-bold">Details</h3>
              <div className="pe-textarea" dangerouslySetInnerHTML={{ __html: details }} />
            </div>

            {comments.length > 0 && (
              <div className="item-comments pe-box p-4 mt-3">
                <h3 className="mt-0 mb-3 text-uppercase font-weight-bold">Comments</h3>
                {comments
                  .filter(({ parent }) => !parent)
                  .map(comment => (
                    <div key={comment.id} className="mb-3">
                      <ItemComment {...comment} addReply={this.handleOpenReplyModal} />
                      {comment.children.length > 0 && (
                        <div className="pl-5 mt-3 mb-5">
                          {comment.children.map(childComment => (
                            <ItemComment key={childComment.id} child={true} {...childComment} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </Col>
          <Col md={3} className="right-panel text-uppercase font-weight-bold" style={{ fontSize: '1.3rem' }}>
            {this.canGiveEstimation && (
              <Button className="pe-btn w-100 mb-3" onClick={this.handleGiveEstimate}>
                Give estimate
              </Button>
            )}
            <div className="pe-box mb-3 p-3">
              <div>Estimation</div>
              <div className="text-right">€ {numeral(getEstimation(estimations)).format('0,0[.]00')}</div>
            </div>
            <div className="pe-box p-3">
              <div className="mb-2">Infos</div>
              <div className="text-capitalize font-weight-normal" style={{ fontSize: '1rem' }}>
                Estimations: {numeral(estimations.length).format('0,0')}
                <br />
                Comments: {numeral(comments.length).format('0,0')}
                <br />
              </div>
              <div className="text-right text-lowercase">mehr</div>
              <div className="item-lister c-pointer" onClick={() => this.gotoPublicUserPage(user.id)}>
                <div className="mb-2">Lister</div>
                <div className="d-flex align-items-center">
                  <img src={getUserPhotoUrl(user.photo)} className="mr-2" style={{ width: 30, height: 30 }} alt="" />
                  <div className="text-none font-weight-normal" style={{ fontSize: '1rem' }}>
                    {user.username}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const selectors = createStructuredSelector({
  user: selectUserData,
  item: selectCurrentItem,
  status: selectItemStatus,
  error: selectItemError,
})

const actions = {
  itemGet,
  itemAddEstimation,
  itemAddToWatchlist,
  itemAddReply,
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(ItemDetailPage)
