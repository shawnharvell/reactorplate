import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import agent from "../data/agent";
import Header from "./header";
import Article from "./article";
import Editor from "./editor";
import Home from "./home";
import Login from "./login";
import Profile from "./profile";
import Register from "./register";
import Settings from "./settings";
import * as Types from "../data/types";
import { AppDispatch, RootState } from "../data/store";
import { setUser } from "../data/user-slice";
import { setAppLoaded } from "../data/common-slice";

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setUser: (user: Types.User) => dispatch(setUser(user)),
    setAppLoaded: () => dispatch(setAppLoaded()),
  };
};

const mapStateToProps = (state: RootState) => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.user.currentUser,
});

export interface AppProps {
  appName?: string;
  currentUser?: Types.User;
  appLoaded?: boolean;
  setUser?: (user: Types.User) => void;
  setAppLoaded?: () => void;
}

const App: React.FC<AppProps> = ({ appName, currentUser, appLoaded, setAppLoaded, setUser }) => {
  useEffect(() => {
    let isCanceled = false;
    (async () => {
      const token = window.localStorage.getItem("jwt");
      if (token) {
        agent.setToken(token);

        const results = await agent.Auth.current();
        if (!isCanceled) {
          if (results.errors) {
            // something has gone horribly wrong
            console.error(results.errors);
          } else {
            setUser(results.user);
          }
        }
      }

      if (!isCanceled) {
        setAppLoaded?.();
      }
    })();

    return () => {
      isCanceled = true;
    };
  }, []);

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
