import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../services/auth';
import { Link } from 'react-router-dom';
export function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Phylo-books
        </Link>
      </div>

      <div className="d-flex">
        {user ? (
          <div>
            <Link className="navbar-brand" to="/users/me">
              Me
            </Link>
            <Link className="navbar-brand" to="/users/orders">
              My orders
            </Link>
            <Link className="navbar-brand" onClick={logout} to="/">
              {' '}
              Logout
            </Link>
          </div>
        ) : (
          <div>
            <Link className="navbar-brand" to="/users/signup">
              {' '}
              Sign up now
            </Link>
            <Link className="navbar-brand" to="/users/signin">
              {' '}
              Sign in now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
//
//
