import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ListErrors from "./list-errors";
import agent from "../agent";
import * as Types from "../reducers/types";

export interface SettingsFormProps {
  currentUser?: Types.User;
  onSubmitForm?: (user: Types.User) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ currentUser, onSubmitForm }) => {
  const [settingsState, setSettingsState] = useState<Record<string, string>>({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });

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

  const updateState = (field: string) => (
    ev: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const state: Record<string, string> = { ...settingsState };
    state[field] = ev.target.value;
    setSettingsState(state);
  };

  const submitForm = (ev: React.MouseEvent) => {
    ev.preventDefault();

    const user = { ...settingsState };
    if (!user.password) {
      delete user.password;
    }

    onSubmitForm(user);
  };

  return (
    <form>
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

        <button className="btn btn-lg btn-primary pull-xs-right" type="submit" onClick={submitForm}>
          Update Settings
        </button>
      </fieldset>
    </form>
  );
};

const mapStateToProps = (state: { common: { currentUser: Types.User } }) => ({
  currentUser: state.common.currentUser,
});

const onClickLogout = () => {
  window.localStorage.setItem("jwt", "");
  agent.setToken(null);
};

export interface SettingsProps {
  currentUser?: Types.User;
}

const Settings: React.FC<SettingsProps> = ({ currentUser }) => {
  const [errors, setErrors] = useState<Types.Errors>(undefined);

  const onSubmitForm = async (user: Types.User) => {
    const results = await agent.Auth.save(user);
    if (results.errors) {
      setErrors(results.errors);
    } else {
      setErrors(undefined);
      // update the state
    }
  };

  return (
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
};

export default connect(mapStateToProps)(Settings);
