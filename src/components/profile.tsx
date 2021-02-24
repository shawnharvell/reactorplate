import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ArticleList from "./article-list";
import agent from "../agent";
import { FOLLOW_USER, UNFOLLOW_USER, PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from "../constants/action-types";

const EditProfileSettings = ({ isUser }) => {
  if (isUser) {
    return (
      <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a" /> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const FollowUserButton = ({ isUser, user, follow, unfollow }) => {
  if (isUser) {
    return null;
  }

  let classes = "btn btn-sm action-btn";
  if (user.following) {
    classes += " btn-secondary";
  } else {
    classes += " btn-outline-secondary";
  }

  const handleClick = (ev) => {
    ev.preventDefault();
    if (user.following) {
      unfollow(user.username);
    } else {
      follow(user.username);
    }
  };

  return (
    <button type="button" className={classes} onClick={handleClick}>
      <i className="ion-plus-round" />
      &nbsp;
      {user.following ? "Unfollow" : "Follow"} {user.username}
    </button>
  );
};

const mapStateToProps = (state) => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  onFollow: (username) =>
    dispatch({
      type: FOLLOW_USER,
      payload: agent.Profile.follow(username),
    }),
  onLoad: (payload) => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnfollow: (username) =>
    dispatch({
      type: UNFOLLOW_USER,
      payload: agent.Profile.unfollow(username),
    }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

const Profile = ({
  match,
  profile,
  pager,
  articles,
  articlesCount,
  currentPage,
  currentUser,
  onLoad,
  onUnload,
  onFollow,
  onUnfollow,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    onLoad(
      Promise.all([
        agent.Profile.get(match.params.username),
        agent.Articles.byAuthor(match.params.username),
      ]).finally(() => setLoading(false))
    );

    return () => onUnload();
  }, []);

  if (!profile) {
    return null;
  }

  const isUser = currentUser && profile.username === currentUser.username;

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} className="user-img" alt={profile.username} />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              <EditProfileSettings isUser={isUser} />
              <FollowUserButton isUser={isUser} user={profile} follow={onFollow} unfollow={onUnfollow} />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link className="nav-link active" to={`/@${profile.username}`}>
                    My Articles
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={`/@${profile.username}/favorites`}>
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            <ArticleList
              pager={pager}
              articles={articles}
              articlesCount={articlesCount}
              currentPage={currentPage}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
