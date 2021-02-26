import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ListErrors from "./list-errors";
import agent from "../agent";
import { UPDATE_FIELD_AUTH, REGISTER, REGISTER_PAGE_UNLOADED } from "../constants/action-types";
import * as Types from "../reducers/types";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onChangeUsername: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
});

export interface RegisterProps {
  onChangeEmail?: (value) => void;
  onChangePassword?: (value) => void;
  onChangeUsername?: (value) => void;
  onSubmit?: (username, email, password) => void;
  onUnload?: () => void;
  email?: string;
  password?: string;
  username?: string;
  inProgress: boolean;
  errors?: Types.Errors;
}

const Register: React.FC<RegisterProps> = ({
  onChangeEmail,
  onChangePassword,
  onChangeUsername,
  onSubmit,
  onUnload,
  email,
  password,
  username,
  inProgress,
  errors,
}) => {
  const changeEmail = (ev) => onChangeEmail(ev.target.value);
  const changePassword = (ev) => onChangePassword(ev.target.value);
  const changeUsername = (ev) => onChangeUsername(ev.target.value);
  const submitForm = (newusername, newemail, newpassword) => (ev) => {
    ev.preventDefault();
    onSubmit(newusername, newemail, newpassword);
  };

  useEffect(() => onUnload(), []);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign Up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={submitForm(username, email, password)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={changeUsername}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={changeEmail}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={changePassword}
                  />
                </fieldset>

                <button className="btn btn-lg btn-primary pull-xs-right" type="submit" disabled={inProgress}>
                  Sign up
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
