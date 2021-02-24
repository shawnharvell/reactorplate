import React from "react";

import ArticlePreview from "./article-preview";
import ListPagination from "./list-pagination";

const ArticleList = ({ articles, pager, articlesCount, currentPage, loading }) => {
  if (!articles || loading) {
    return <div className="article-preview">Loading...</div>;
  }

  if (articles.length === 0 || loading) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticlePreview article={article} key={article.slug} />
      ))}

      <ListPagination pager={pager} articlesCount={articlesCount} currentPage={currentPage} />
    </div>
  );
};

export default ArticleList;
