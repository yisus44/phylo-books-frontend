import React from 'react';
import 'bootswatch/dist/sketchy/bootstrap.min.css';
export function Footer() {
  return (
    <div className="footer">
      <br />

      <p style={{ textAlign: 'center' }}>
        <small>
          <strong>
            Project mainly developed and updated by Jesus Adrian Flores Arevalo
            using Express, Node,React and MongoDB
            <br />
            Here you can find code for the
            <a href="https://github.com/yisus44/phylo-books-frontend">
              {' '}
              frontend{' '}
            </a>
            and for the
            <a href="https://github.com/yisus44/phylo-books"> backend.</a>{' '}
          </strong>
        </small>
      </p>
    </div>
  );
}
