import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ListErrors from "./list-errors";
import agent from "../agent";
import { SETTINGS_SAVED, SETTINGS_PAGE_UNLOADED, LOGOUT } from "../constants/action-types";

const SettingsForm = ({ currentUser, onSubmitForm }) => {
  const [settingsState, setSettingsState] = useState({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });

  const updateState = (field) => (ev) => {
    const state = { ...settingsState };
    state[field] = ev.target.value;
    setSettingsState(state);
  };

  const submitForm = (ev) => {
    ev.preventDefault();

    const user = { ...settingsState };
    if (!user.password) {
      delete user.password;
    }

    onSubmitForm(user);
  };

  useEffect(() => {
    if (currentUser) {
      setSettingsState({
        image: currentUser.image || "",
        username: currentUser.username,
        bio: currentUser.bio,
        email: currentUser.email,
        password: "",
      });
    }
  }, [currentUser]);

  return (
    <form onSubmit={submitForm}>
      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            value={settingsState.image}
            onChange={updateState("image")}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={settingsState.username}
            onChange={updateState("username")}
          />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows={8}
            placeholder="Short bio about you"
            value={settingsState.bio}
            onChange={updateState("bio")}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={settingsState.email}
            onChange={updateState("email")}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="New Password"
            value={settingsState.password}
            onChange={updateState("password")}
          />
        </fieldset>

        <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
          Update Settings
        </button>
      </fieldset>
    </form>
  );
};

const mapStateToProps = (state) => ({
  ...state.settings,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: (user) => dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED }),
});

const Settings = ({ errors, currentUser, onSubmitForm, onClickLogout }) => (
  <div className="settings-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Your Settings</h1>

          <ListErrors errors={errors} />

          <SettingsForm currentUser={currentUser} onSubmitForm={onSubmitForm} />

          <hr />

          <button type="button" className="btn btn-outline-danger" onClick={onClickLogout}>
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
