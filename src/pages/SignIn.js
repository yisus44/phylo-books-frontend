import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ext } from '../keys';
import axios from 'axios';

import { AuthContext } from '../services/auth';

export function SignIn() {
  const context = useContext(AuthContext);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  let history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post(ext + '/api/users/signin', {
        password,
        email,
      })
      .then((response) => {
        context.login(response.data);

        history.push('/');
      })
      .catch((reason) => {
        alert('Bad input');
      });
  }

  return (
    <div className="container center p-2" style={{ maxWidth: '40rem' }}>
      <br />
      <form onSubmit={onSubmit} noValidate>
        <fieldset>
          <legend>Sign in now!</legend>
          <br />
          <br />
          <br />
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control-plaintext"
                name="email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control-plaintext"
                name="password"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <div className="col-sm">
              <button type="submit" className="btn btn-primary m-2">
                Sign in!
              </button>
              <Link to="/users/signup">
                <button type="submit" className="btn btn-primary m-2">
                  Not signed up yet?
                </button>
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
