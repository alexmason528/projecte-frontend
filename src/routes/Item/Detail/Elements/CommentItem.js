import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import cx from 'classnames'
import { FormattedMessage } from 'react-intl'
import { MdReply } from 'react-icons/md'
import { UserDetail } from 'components'

const Comment = ({ user, id, estimation, content, children, child, addReply }) => (
  <div className={cx('item-comment', { 'mb-3': child })}>
    <div className="row">
      <div className="col col-md-6 col-sm-12 mb-2">
        <UserDetail user={user} />
      </div>
      {estimation && (
        <div className="col col-md-6 col-sm-12 mb-2">
          <h4 className="item-comment__estimation my-0">
            <FormattedMessage id="estify.estimation" />: <FormattedMessage id="estify.currency" />{' '}
            {numeral(estimation.value).format('0,00[.]00')}
          </h4>
        </div>
      )}
    </div>

    <div className="item-comment__content pe-textarea mt-3" dangerouslySetInnerHTML={{ __html: content }} />
    <div className="item-comment__reply mt-2">
      <div>
        {children.length > 0 && (
          <Fragment>
            <FormattedMessage id="estify.replies" /> ({children.length})
          </Fragment>
        )}
      </div>
      <div>
        {!child && (
          <span className="c-pointer" onClick={() => addReply(id)}>
            <FormattedMessage id="estify.leaveReply" />
            <MdReply style={{ fontSize: '1.5rem' }} />
          </span>
        )}
      </div>
    </div>
  </div>
)

Comment.propTypes = {
  user: PropTypes.object,
  estimation: PropTypes.any,
  content: PropTypes.string,
  children: PropTypes.array,
  child: PropTypes.bool,
}

Comment.defaultProps = {
  child: false,
}

export default Comment
