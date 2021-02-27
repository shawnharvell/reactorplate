import React from "react";
import { Link } from "react-router-dom";

import ArticleActions from "./article-actions";
import * as Types from "../../data/types";

export interface ArticleMetaProps {
  article?: Types.Article;
  canModify?: boolean;
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({ article, canModify }) => (
  <div className="article-meta">
    <Link to={`/@${article.author.username}`}>
      <img src={article.author.image} alt={article.author.username} />
    </Link>

    <div className="info">
      <Link to={`/@${article.author.username}`} className="author">
        {article.author.username}
      </Link>
      <span className="date">{new Date(article.createdAt).toDateString()}</span>
    </div>

    <ArticleActions canModify={canModify} article={article} />
  </div>
);
export default ArticleMeta;