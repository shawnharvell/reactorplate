import React from "react";

import ArticlePreview from "./article-preview";
import ListPagination from "./list-pagination";
import * as Types from "../reducers/types";

export interface ArticleListProps {
  articles?: Types.Article[];
  articlesCount?: number;
  currentPage?: number;
  loading?: boolean;
  onSetPage?: (page: number) => void;
  onFavorited?: (article: Types.Article) => void;
  onUnfavorited?: (article: Types.Article) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  articlesCount,
  currentPage,
  loading,
  onSetPage,
  onFavorited,
  onUnfavorited,
}) => {
  if (!articles || loading) {
    return <div className="article-preview">Loading...</div>;
  }

  if (articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticlePreview article={article} key={article.slug} onFavorited={onFavorited} onUnfavorited={onUnfavorited} />
      ))}

      <ListPagination articlesCount={articlesCount} currentPage={currentPage} onSetPage={onSetPage} />
    </div>
  );
};

export default ArticleList;
