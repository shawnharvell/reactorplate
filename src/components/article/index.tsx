import React, { useEffect } from "react";
import { connect } from "react-redux";
import marked from "marked";
import { Dispatch } from "redux";
import { useParams } from "react-router-dom";

import ArticleMeta from "./article-meta";
import CommentContainer from "./comment-container";
import agent from "../../agent";
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from "../../constants/action-types";
import * as Types from "../../reducers/types";

const mapStateToProps = (state) => ({
  ...state.article,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoad: (payload) => dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: ARTICLE_PAGE_UNLOADED }),
});

export interface ArticleProps {
  onLoad?: (payload) => void;
  onUnload?: () => void;
  article?: Types.Article;
  currentUser?: Types.User;
  comments?: Types.Comment[];
  commentErrors?: Types.Errors;
}

const Article: React.FC<ArticleProps> = ({ onLoad, onUnload, article, currentUser, comments, commentErrors }) => {
  const { id: slug = undefined } = useParams<{ id: string }>();

  useEffect(() => {
    onLoad(Promise.all([agent.Articles.get(slug), agent.Comments.forArticle(slug)]));

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
          <CommentContainer comments={comments || []} errors={commentErrors} slug={slug} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
