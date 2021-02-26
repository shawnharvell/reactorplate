import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

import agent from "../agent";
import Header from "./header";
import { APP_LOAD, REDIRECT } from "../constants/action-types";
import Article from "./article";
import Editor from "./editor";
import Home from "./home";
import Login from "./login";
import Profile from "./profile";
import Register from "./register";
import Settings from "./settings";
import * as Types from "../reducers/types";

const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) => dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

export interface AppProps {
  onLoad?: (payload, token?: string) => void;
  onRedirect?: () => void;
  redirectTo?: string;
  appName?: string;
  currentUser?: Types.User;
  appLoaded?: boolean;
}

const App: React.FC<AppProps> = ({ onLoad, onRedirect, redirectTo, appName, currentUser, appLoaded }) => {
  const history = useHistory();
  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }

    onLoad(token ? agent.Auth.current() : null, token);
  }, []);

  useEffect(() => {
    if (redirectTo) {
      history?.push(redirectTo);
      onRedirect();
    }
  }, [redirectTo]);

  if (appLoaded) {
    return (
      <div>
        <Header appName={appName} currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/editor/:slug" component={Editor} />
          <Route path="/editor" component={Editor} />
          <Route path="/article/:id" component={Article} />
          <Route path="/settings" component={Settings} />
          <Route path="/@:username/favorites" component={Profile} />
          <Route path="/@:username" component={Profile} />
        </Switch>
      </div>
    );
  }
  return (
    <div>
      <Header appName={appName} currentUser={currentUser} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
