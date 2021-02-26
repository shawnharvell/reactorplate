import React from "react";
import { connect } from "react-redux";

import ArticleList from "../article-list";
import agent, { ArticleListResult } from "../../agent";
import { CHANGE_TAB } from "../../constants/action-types";
import * as Types from "../../reducers/types";

export interface YourFeedTabProps {
  token?: string;
  tab: string;
  onTabClick: (tab: string, pager: any, payload: any) => void;
}

const YourFeedTab: React.FC<YourFeedTabProps> = ({ token, tab, onTabClick }) => {
  if (token) {
    const clickHandler = (ev: React.MouseEvent) => {
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

export interface GlobalFeedTabProps {
  tab: string;
  onTabClick: (tab: string, pager: any, payload: any) => void;
}

const GlobalFeedTab: React.FC<GlobalFeedTabProps> = ({ tab, onTabClick }) => {
  const clickHandler = (ev: React.MouseEvent) => {
    ev.preventDefault();
    onTabClick("all", agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a href="" className={tab === "all" ? "nav-link active" : "nav-link"} onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab: React.FC<{ tag?: string }> = ({ tag }) => {
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

const mapStateToProps = (state: any) => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch: any) => ({
  onTabClick: (tab: string, pager: any, payload: any) => dispatch({ type: CHANGE_TAB, tab, pager, payload }),
});

export interface MainViewProps {
  token?: string;
  tab?: string;
  tag?: string;
  pager?: (page: number) => Promise<ArticleListResult>;
  articles?: Types.Article[];
  loading?: boolean;
  articlesCount?: number;
  currentPage?: number;
  onTabClick?: (tab: string, pager: any, payload: any) => void;
}

const MainView: React.FC<MainViewProps> = ({
  token,
  tab,
  tag,
  pager,
  articles,
  loading,
  articlesCount,
  currentPage,
  onTabClick,
}) => (
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
