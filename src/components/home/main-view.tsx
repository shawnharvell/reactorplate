import React from "react";
import { connect } from "react-redux";

import ArticleList from "../article-list";
import agent from "../../agent";
import { CHANGE_TAB } from "../../constants/action-types";

const YourFeedTab = ({ token, tab, onTabClick }) => {
  if (token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      onTabClick("feed", agent.Articles.feed, agent.Articles.feed());
    };

    return (
      <li className="nav-item">
        <a href="" className={tab === "feed" ? "nav-link active" : "nav-link"} onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick("all", agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a href="" className={props.tab === "all" ? "nav-link active" : "nav-link"} onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = ({ tag }) => {
  if (!tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound" /> {tag}
      </a>
    </li>
  );
};

const mapStateToProps = (state) => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload }),
});

const MainView = ({ token, tab, tag, pager, articles, loading, articlesCount, currentPage, onTabClick }) => (
  <div className="col-md-9">
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <YourFeedTab token={token} tab={tab} onTabClick={onTabClick} />

        <GlobalFeedTab tab={tab} onTabClick={onTabClick} />

        <TagFilterTab tag={tag} />
      </ul>
    </div>

    <ArticleList
      pager={pager}
      articles={articles}
      loading={loading}
      articlesCount={articlesCount}
      currentPage={currentPage}
    />
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
