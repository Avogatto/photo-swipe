import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
  return (
    <div className="landing-page">
      <main className="landing-page__content u-center-vertical u-center-text">
        <div className="row">
          <Link to="/albums">
            <button className="btn">View Existing Albums</button>
          </Link>
        </div>
        <div className="row">
          <button className="btn">Create New Album</button>
        </div>
      </main>
    </div>
  );
}
