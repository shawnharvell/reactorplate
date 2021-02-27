import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import marked from "marked";
import { useParams } from "react-router-dom";

import ArticleMeta from "./article-meta";
import CommentContainer from "./comment-container";
import agent from "../../data/agent";
import * as Types from "../../data/types";
import { RootState } from "../../data/store";

const mapStateToProps = (state: RootState) => ({
  currentUser: state.user.currentUser,
});

export interface ArticleProps {
  currentUser?: Types.User;
}

const Article: React.FC<ArticleProps> = ({ currentUser }) => {
  const { id: slug } = useParams<{ id: string }>();

  const [article, setArticle] = useState<Types.Article>();

  useEffect(() => {
    // onLoad(Promise.all([agent.Articles.get(slug), agent.Comments.forArticle(slug)]));
    let isCanceled = false;

    if (slug) {
      setArticle(undefined);
      (async () => {
        const results = await agent.Articles.get(slug);
        if (!results.errors && !isCanceled) {
          setArticle(results.article);
        }
      })();
    }

    return () => {
      isCanceled = true;
    };
  }, [slug]);

  if (!article) {
    return null;
  }

  const markup = { __html: marked(article.body, { sanitize: true }) };
  const canModify = currentUser && currentUser.username === article.author.username;
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} canModify={canModify} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={markup} />

            <ul className="tag-list">
              {article.tagList.map((tag) => (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions" />

        <div className="row">
          <CommentContainer slug={slug} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Article);
