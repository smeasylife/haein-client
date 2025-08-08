import React from 'react';
import PropTypes from 'prop-types';

const AdminComment = ({ comment }) => {
  if (!comment) return null;

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-md">
      <p className="font-semibold text-sm text-gray-800">{comment.author}</p>
      <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{comment.text}</p>
    </div>
  );
};

AdminComment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

export default AdminComment;
