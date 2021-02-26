import React from "react";

import agent from "../../agent";
import * as Types from "../../reducers/types";

export interface DeleteButtonProps {
  slug?: Types.Slug;
  commentId?: number;
  show?: boolean;
  onCommentDeleted?: (id: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ slug, commentId, show, onCommentDeleted }) => {
  const del = async () => {
    const results = await agent.Comments.delete(slug, commentId);
    if (!results.errors) {
      onCommentDeleted?.(commentId);
    }
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

export default DeleteButton;
