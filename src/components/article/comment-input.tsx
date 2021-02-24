import React, { useState } from "react";
import { connect } from "react-redux";

import agent from "../../agent";
import { ADD_COMMENT } from "../../constants/action-types";

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (payload) => dispatch({ type: ADD_COMMENT, payload }),
});

const CommentInput = ({ slug, onSubmit, currentUser }) => {
  const [body, setBody] = useState<string>("");
  const onChange = (ev) => {
    setBody(ev.target.value);
  };
  const createComment = (ev) => {
    ev.preventDefault();
    const payload = agent.Comments.create(slug, { body });
    setBody("");
    onSubmit(payload);
  };
  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea className="form-control" placeholder="Write a comment..." value={body} onChange={onChange} rows={3} />
      </div>
      <div className="card-footer">
        <img src={currentUser.image} className="comment-author-img" alt={currentUser.username} />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
