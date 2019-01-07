import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import cx from 'classnames'
import { MdReply } from 'react-icons/md'
import { getUserPhotoUrl } from 'utils/common'

const Comment = ({ user, id, estimation, content, children, child, addReply }) => (
  <div className={cx('item-comment', { 'mb-3': child })}>
    <div className="d-flex justify-content-between">
      <h4 className="item-comment__name my-0">
        <img src={getUserPhotoUrl(user.photo)} className="mr-2" style={{ width: 30, height: 30 }} alt="" />
        {user.username}
      </h4>
      {estimation && <h4 className="item-comment__estimation my-0">Estimation: $ {numeral(estimation.value).format('0,00[.]00')}</h4>}
    </div>
    <div className="item-comment__content pe-textarea mt-3" dangerouslySetInnerHTML={{ __html: content }} />
    <div className="item-comment__reply mt-2">
      <div>{children.length > 0 && `Replys (${children.length})`}</div>
      <div>
        {!child && (
          <span className="c-pointer" onClick={() => addReply(id)}>
            Leave reply <MdReply style={{ fontSize: '1.5rem' }} />
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
