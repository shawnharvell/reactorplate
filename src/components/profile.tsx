import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

import ArticleList from "./article-list";
import agent from "../agent";
import * as Types from "../reducers/types";

const EditProfileSettings: React.FC<{ isUser: boolean }> = ({ isUser }) => {
  if (isUser) {
    return (
      <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a" /> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

export interface FollowUserButtonProps {
  isUser: boolean;
  user?: Types.Profile;
  follow?: (username: string) => void;
  unfollow?: (username: string) => void;
}

const FollowUserButton: React.FC<FollowUserButtonProps> = ({ isUser, user, follow, unfollow }) => {
  if (isUser) {
    return null;
  }

  let classes = "btn btn-sm action-btn";
  if (user.following) {
    classes += " btn-secondary";
  } else {
    classes += " btn-outline-secondary";
  }

  const handleClick = (ev: React.MouseEvent) => {
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

const mapStateToProps = (state: { common: { currentUser: Types.User } }) => ({
  currentUser: state.common.currentUser,
});

export interface ProfileProps {
  currentPage?: number;
  currentUser?: Types.User;
}

const Profile: React.FC<ProfileProps> = ({ currentPage, currentUser }) => {
  const { username } = useParams<{ username: string }>();
  const { path } = useRouteMatch();
  const tab = path?.endsWith("favorites") ? "favorites" : "authored";

  const [profileLoading, setProfileLoading] = useState(false);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [profile, setProfile] = useState<Types.Profile>();
  const [articles, setArticles] = useState<Types.Article[]>();
  const [articlesCount, setArticlesCount] = useState<number>(0);

  useEffect(() => {
    let profileLoadCanceled = false;

    setProfileLoading(true);
    (async () => {
      const profileResults = await agent.Profile.get(username);
      if (!profileLoadCanceled) {
        setProfile(profileResults.profile);
        setProfileLoading(false);
      }
    })();

    return () => {
      profileLoadCanceled = true;
    };
  }, [username]);

  useEffect(() => {
    let articleLoadCanceled = false;

    setArticlesLoading(true);
    (async () => {
      const articleResults =
        tab === "authored" ? await agent.Articles.byAuthor(username) : await agent.Articles.favoritedBy(username);
      if (!articleLoadCanceled) {
        setArticles(articleResults.articles);
        setArticlesCount(articleResults.articlesCount);
        setArticlesLoading(false);
      }
    })();

    return () => {
      articleLoadCanceled = true;
    };
  }, [username, tab]);

  const onFollow = useCallback(async () => {
    const results = await agent.Profile.follow(username);
    setProfile(results.profile);
  }, [username]);

  const onUnfollow = useCallback(async () => {
    const results = await agent.Profile.unfollow(username);
    setProfile(results.profile);
  }, [username]);

  if (!profile) {
    return null;
  }

  const isUser = currentUser && profile.username === currentUser.username;

  if (profileLoading) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} className="user-img" alt="" role="presentation" />
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
                  <Link className={classnames("nav-link", { active: tab === "authored" })} to={`/@${profile.username}`}>
                    My Articles
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={classnames("nav-link", { active: tab === "favorites" })}
                    to={`/@${profile.username}/favorites`}
                  >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            <ArticleList
              articles={articles}
              articlesCount={articlesCount}
              currentPage={currentPage}
              loading={articlesLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Profile);
