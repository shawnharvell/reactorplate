import React, { useEffect } from "react";
import { connect } from "react-redux";
import marked from "marked";

import ArticleMeta from "./article-meta";
import CommentContainer from "./comment-container";
import agent from "../../agent";
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from "../../constants/action-types";

const mapStateToProps = (state) => ({
  ...state.article,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: ARTICLE_PAGE_UNLOADED }),
});

const Article = ({ onLoad, onUnload, match, article, currentUser, comments, commentErrors }) => {
  useEffect(() => {
    onLoad(Promise.all([agent.Articles.get(match.params.id), agent.Comments.forArticle(match.params.id)]));

    return () => {
      onUnload();
    };
  }, []);

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
          <CommentContainer
            comments={comments || []}
            errors={commentErrors}
            slug={match.params.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
