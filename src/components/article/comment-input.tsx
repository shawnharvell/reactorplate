import React, { useState } from "react";

import agent from "../../agent";
import ListErrors from "../list-errors";
import * as Types from "../../reducers/types";

export interface CommentInputProps {
  slug?: Types.Slug;
  currentUser?: Types.User;
  onCommentSaved?: (comment: Types.Comment) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ slug, onCommentSaved, currentUser }) => {
  const [body, setBody] = useState<string>("");
  const [errors, setErrors] = useState<Types.Errors>();

  const onChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(ev.target.value);
  };

  const createComment = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const results = await agent.Comments.create(slug, { body });
    if (results.errors) {
      setErrors(results.errors);
    } else {
      onCommentSaved?.(results.comment);
      setBody("");
    }
  };

  return (
    <>
      <ListErrors errors={errors} />
      <form className="card comment-form" onSubmit={createComment}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            value={body}
            onChange={onChange}
            rows={3}
          />
        </div>
        <div className="card-footer">
          <img src={currentUser.image} className="comment-author-img" alt={currentUser.username} />
          <button className="btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    </>
  );
};

export default CommentInput;
