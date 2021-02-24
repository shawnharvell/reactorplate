import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import agent from "../agent";
import { PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from "../constants/action-types";

const mapDispatchToProps = (dispatch) => ({
  onLoad: (pager, payload) => dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

const mapStateToProps = (state) => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile,
});

const ProfileFavorites = (onLoad, onUnload, match, profile) => {
  useEffect(() => {
    onLoad(
      (page) => agent.Articles.favoritedBy(match.params.username, page),
      Promise.all([agent.Profile.get(match.params.username), agent.Articles.favoritedBy(match.params.username)])
    );

    return () => onUnload();
  }, []);

  return (
    <ul className="nav nav-pills outline-active">
      <li className="nav-item">
        <Link className="nav-link" to={`/@${profile.username}`}>
          My Articles
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link active" to={`/@${profile.username}/favorites`}>
          Favorited Articles
        </Link>
      </li>
    </ul>
  );
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
