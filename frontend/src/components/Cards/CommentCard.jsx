import React from "react";

const postComment = {
  commentId: 1,
  content: "First comment",
  createAt: new Date().getTime(),
  classPostId: 1,
  author: { userId: 1, userName: "hieuht01", role: 1 },
};

const CommentCard = ({ postComment: data }) => {
  return <div>CommentCard</div>;
};

export default CommentCard;
