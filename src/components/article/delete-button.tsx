import React from "react";
import { connect } from "react-redux";

import agent from "../../agent";
import { DELETE_COMMENT } from "../../constants/action-types";
import * as Types from "../../reducers/types";

const mapDispatchToProps = (dispatch) => ({
  onClick: (payload, commentId) => dispatch({ type: DELETE_COMMENT, payload, commentId }),
});

export interface DeleteButtonProps {
  slug?: Types.Slug;
  commentId?: number;
  show?: boolean;
  onClick?: (payload, commentId) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ slug, commentId, show, onClick }) => {
  const del = () => {
    const payload = agent.Comments.delete(slug, commentId);
    onClick(payload, commentId);
  };

  if (show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del} onKeyUp={del} aria-label="Delete" role="button" tabIndex={-1} />
      </span>
    );
  }
  return null;
};

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
