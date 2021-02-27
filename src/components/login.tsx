import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import ListErrors from "./list-errors";
import agent from "../data/agent";
import * as Types from "../data/types";
import { AppDispatch } from "../data/store";
import { clearUser, setUser } from "../data/user-slice";

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    clearUser: () => dispatch(clearUser()),
    setUser: (user: Types.User) => dispatch(setUser(user)),
  };
};

export interface LoginProps {
  clearUser?: () => void;
  setUser?: (user: Types.User) => void;
}

const Login: React.FC<LoginProps> = ({ clearUser, setUser }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [errors, setErrors] = useState<Types.Errors>(undefined);

  const history = useHistory();

  useEffect(() => {
    clearUser?.();
    window.localStorage.setItem("jwt", undefined);
  }, []);

  const onClickSubmit = async (ev: React.MouseEvent) => {
    setInProgress(true);
    ev.preventDefault();
    const results = await agent.Auth.login(email, password);
    console.log("RESULTS", results);
    if (results.errors) {
      setErrors(results.errors);
    } else {
      setErrors(undefined);
      setUser?.(results.user);
      window.localStorage.setItem("jwt", results.user.token);
      agent.setToken(results.user.token);
      history?.push("/");
    }

    setInProgress(false);
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <ListErrors errors={errors} />

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  onClick={onClickSubmit}
                  disabled={inProgress}
                >
                  Sign in
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Login);
