import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ext } from '../keys';
import axios from 'axios';

import { AuthContext } from '../services/auth';

export function SignUp() {
  const context = useContext(AuthContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  let history = useHistory();
  function onSubmit(e) {
    e.preventDefault();
    axios
      .post(ext + '/api/users/signup', {
        name: name,
        password: password,
        email: email,
      })
      .then((response) => {
        context.login(response.data);
        history.push('/');
      })
      .catch((reason) => {
        console.log(reason);
        alert('Bad input');
      });
  }

  return (
    <div className="container center p-2" style={{ maxWidth: '40rem' }}>
      <br />
      <form onSubmit={onSubmit} noValidate>
        <fieldset>
          <legend>Sign up now!</legend>
          <br />
          <br />
          <br />
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control-plaintext"
                required
                name="name"
                placeholder="A cool username"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control-plaintext"
                name="email"
                placeholder="A valid email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
              <p>Remember that email must not have been registered before</p>
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
                placeholder="A password of at least 8 characters"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
              <p>Remember that password must be 8 character long at least</p>
            </div>
          </div>
          <br />
          <div className="form-group row">
            <div className="col-sm">
              <button type="submit" className="btn btn-primary m-2">
                Sign up!
              </button>
              <Link to="/users/signin">
                <button type="submit" className="btn btn-primary m-2">
                  Already sign up?
                </button>
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
