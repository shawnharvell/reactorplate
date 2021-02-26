import React from "react";
import { Link } from "react-router-dom";

import * as Types from "../reducers/types";

export interface LoggedOutViewProps {
  currentUser?: Types.User;
}
const LoggedOutView: React.FC<LoggedOutViewProps> = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

export interface LoggedInViewProps {
  currentUser?: Types.User;
}
const LoggedInView: React.FC<LoggedInViewProps> = ({ currentUser }) => {
  if (currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose" />
            &nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a" />
            &nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link to={`/@${currentUser.username}`} className="nav-link">
            <img src={currentUser.image} className="user-pic" alt="" role="presentation" />
            {currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

export interface HeaderProps {
  currentUser?: Types.User;
  appName: string;
}
const Header: React.FC<HeaderProps> = ({ appName, currentUser }) => (
  <nav className="navbar navbar-light">
    <div className="container">
      <Link to="/" className="navbar-brand">
        {appName.toLowerCase()}
      </Link>

      <LoggedOutView currentUser={currentUser} />

      <LoggedInView currentUser={currentUser} />
    </div>
  </nav>
);

export default Header;
