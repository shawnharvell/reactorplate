import React, { useEffect } from "react";
import { connect } from "react-redux";

import Banner from "./banner";
import MainView from "./main-view";
import Tags from "./tags";
import agent from "../../agent";
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, APPLY_TAG_FILTER } from "../../constants/action-types";
import * as Types from "../../reducers/types";

const { Promise } = global;

const mapStateToProps = (state: any) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch: any) => ({
  onClickTag: (tag: string, pager: any, payload: any) => dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab: string, pager: any, payload: any) => dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

export interface HomeProps {
  token?: string;
  appName: string;
  tags: Types.Tag[];
  onClickTag?: (tag: string, pager: any, payload: any) => void;
  onLoad?: (tab: string, pager: any, payload: any) => void;
  onUnload?: () => void;
}

const Home: React.FC<HomeProps> = ({ token, appName, tags, onClickTag, onLoad, onUnload }) => {
  useEffect(() => {
    const tab = token ? "feed" : "all";
    const articlesPromise = token ? agent.Articles.feed : agent.Articles.all;

    onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));

    return () => {
      onUnload();
    };
  }, []);

  return (
    <div className="home-page">
      <Banner token={token} appName={appName} />

      <div className="container page">
        <div className="row">
          <MainView />

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Tags tags={tags} onClickTag={onClickTag} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
