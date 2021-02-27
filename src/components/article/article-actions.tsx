import React from "react";
import { Link } from "react-router-dom";

import agent from "../../data/agent";
import * as Types from "../../data/types";

export interface ArticleActionsProps {
  article?: Types.Article;
  canModify?: boolean;
  onDeleteArticle?: (slug: string) => void;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({ article, canModify, onDeleteArticle }) => {
  const del = async () => {
    const results = await agent.Articles.del(article.slug);
    if (!results.errors) {
      onDeleteArticle?.(article.slug);
    }
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

export default ArticleActions;
