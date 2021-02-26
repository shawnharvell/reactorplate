import React from "react";
import { Link } from "react-router-dom";

import agent from "../agent";
import * as Types from "../reducers/types";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

export interface ArticlePreviewProps {
  article?: Types.Article;
  onFavorited?: (article: Types.Article) => void;
  onUnfavorited?: (article: Types.Article) => void;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article, onFavorited, onUnfavorited }) => {
  const favoriteButtonClass = article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;

  const handleClick = async (ev: React.MouseEvent) => {
    ev.preventDefault();
    if (article.favorited) {
      const results = await agent.Articles.unfavorite(article.slug);
      if (!results.errors) {
        onUnfavorited?.(results.article);
      }
    } else {
      const results = await agent.Articles.favorite(article.slug);
      if (!results.errors) {
        onFavorited?.(results.article);
      }
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">{new Date(article.createdAt).toDateString()}</span>
        </div>

        <div className="pull-xs-right">
          <button type="button" className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart" /> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default ArticlePreview;
