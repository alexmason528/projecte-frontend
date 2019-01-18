import React from 'react'
import PropTypes from 'prop-types'
import ItemComment from './CommentItem'

const Comments = ({ comments, addReply }) => {
  if (!comments.length) {
    return null
  }

  return (
    <div>
      {comments
        .filter(({ parent }) => !parent)
        .map(comment => (
          <div key={comment.id} className="mb-3">
            <ItemComment {...comment} addReply={addReply} />
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
  )
}

Comments.propTypes = {
  comments: PropTypes.array,
  addReply: PropTypes.func,
}

export default Comments
