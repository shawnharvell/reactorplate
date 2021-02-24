import React from "react";
import { connect } from "react-redux";

import agent from "../../agent";
import { DELETE_COMMENT } from "../../constants/action-types";

const mapDispatchToProps = (dispatch) => ({
  onClick: (payload, commentId) => dispatch({ type: DELETE_COMMENT, payload, commentId }),
});

const DeleteButton = (props) => {
  const del = () => {
    const payload = agent.Comments.delete(props.slug, props.commentId);
    props.onClick(payload, props.commentId);
  };

  if (props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del} onKeyUp={del} aria-label="Delete" role="button" tabIndex={-1} />
      </span>
    );
  }
  return null;
};

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
