import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ListErrors from "./list-errors";
import agent from "../data/agent";
import * as Types from "../data/types";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [errors, setErrors] = useState<Types.Errors>(undefined);

  const history = useHistory();

  const onClickSubmit = async (ev: React.MouseEvent) => {
    setInProgress(true);
    ev.preventDefault();
    const results = await agent.Auth.register(username, email, password);
    if (results.errors) {
      setErrors(results.errors);
    } else {
      setErrors(undefined);
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
            <h1 className="text-xs-center">Sign Up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ListErrors errors={errors} />

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                  />
                </fieldset>

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

export default Register;
