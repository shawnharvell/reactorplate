import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import agent from "../../agent";
import { DELETE_ARTICLE } from "../../constants/action-types";
import * as Types from "../../reducers/types";

const mapDispatchToProps = (dispatch) => ({
  onClickDelete: (payload) => dispatch({ type: DELETE_ARTICLE, payload }),
});

export interface ArticleActionsProps {
  article?: Types.Article;
  canModify?: boolean;
  onClickDelete?: (payload) => void;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({ article, canModify, onClickDelete }) => {
  const del = () => {
    onClickDelete(agent.Articles.del(article.slug));
  };
  if (canModify) {
    return (
      <span>
        <Link to={`/editor/${article.slug}`} className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit" />
          Edit Article
        </Link>

        <button type="button" className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a" />
          Delete Article
        </button>
      </span>
    );
  }

  return <span>&nbsp;</span>;
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
