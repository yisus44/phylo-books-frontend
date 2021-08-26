import React, { useState } from 'react';
import axios from 'axios';
import { ext } from '../keys';
export function Me() {
  const token = localStorage.getItem('jwtToken');

  const [user, setUser] = useState();

  axios
    .get(ext + '/api/users/me', {
      headers: { 'x-access-token': token },
    })
    .then((data) => {
      if (!user) {
        setUser(data.data.user);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="container p-1">
      <div className="row">
        {user && (
          <div>
            <div className="card mb-3">
              <h3 className="card-header">Your info, {user.name}</h3>
              <div className="card-body">
                <h5 className="card-title">Your email {user.email}</h5>
              </div>

              <div className="card-body">
                {user.__v === 0 && (
                  <p className="card-text">
                    Your profile has never been updated
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
