import React from "react";
import Comment from "./comment";

const CommentList = ({ currentUser, slug, comments }) => (
  <div>
    {comments.map((comment) => (
      <Comment comment={comment} currentUser={currentUser} slug={slug} key={comment.id} />
    ))}
  </div>
);

export default CommentList;
