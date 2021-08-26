import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../services/auth';
export function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Phylo-books
        </a>
      </div>

      <div className="d-flex">
        {user ? (
          <div>
            <a className="navbar-brand" href="/users/me">
              Me
            </a>
            <a className="navbar-brand" onClick={logout} href="/">
              Logout
            </a>
          </div>
        ) : (
          <div>
            <a className="navbar-brand" href="/users/signup">
              Sign up now
            </a>
            <a className="navbar-brand" href="/users/signin">
              Sign in now
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
//
//
