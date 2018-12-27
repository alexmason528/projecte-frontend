import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import cx from 'classnames'
import { MdReply } from 'react-icons/md'
import { API_BASE_URL } from 'config/base'

const Comment = ({ user, id, estimation, content, children, child, addReply }) => (
  <div className={cx('item-comment', { 'mb-3': child })}>
    <div className="d-flex justify-content-between">
      <h4 className="item-comment__name my-0">
        {user.photo && <div className="item-comment__photo mr-3" style={{ backgroundImage: `url(${API_BASE_URL}${user.photo})` }} />}
        {user.username}
      </h4>
      {estimation && <h4 className="item-comment__estimation my-0">Estimation: $ {numeral(estimation.value).format('0,00[.]00')}</h4>}
    </div>
    <div className="item-comment__content mt-3">{content}</div>
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
