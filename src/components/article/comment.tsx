import React from "react";
import { Link } from "react-router-dom";

import DeleteButton from "./delete-button";
import * as Types from "../../data/types";

export interface CommentProps {
  comment?: Types.Comment;
  currentUser?: Types.User;
  slug?: Types.Slug;
  onCommentDeleted?: (id: number) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, currentUser, slug, onCommentDeleted }) => {
  const show = currentUser && currentUser.username === comment.author.username;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/@${comment.author.username}`} className="comment-author">
          <img src={comment.author.image} className="comment-author-img" alt={comment.author.username} />
        </Link>
        &nbsp;
        <Link to={`/@${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">{new Date(comment.createdAt).toDateString()}</span>
        <DeleteButton show={show} slug={slug} commentId={comment.id} onCommentDeleted={onCommentDeleted} />
      </div>
    </div>
  );
};

export default Comment;
