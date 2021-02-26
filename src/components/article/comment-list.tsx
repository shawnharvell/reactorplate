import React from "react";
import Comment from "./comment";

import * as Types from "../../reducers/types";

export interface CommentListProps {
  currentUser?: Types.User;
  slug?: Types.Slug;
  comments?: Types.Comment[];
  onCommentDeleted?: (id: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({ currentUser, slug, comments }) => (
  <div>
    {comments.map((comment) => (
      <Comment comment={comment} currentUser={currentUser} slug={slug} key={comment.id} />
    ))}
  </div>
);

export default CommentList;
