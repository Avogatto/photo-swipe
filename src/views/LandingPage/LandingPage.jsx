import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
  return (
    <div className="landing-page  u-center-vertical u-center-text">
      <Link to="/albums">
        <button className="btn u-margin-bottom-big">
          View Existing Albums
        </button>
      </Link>
      <Link to="/create-album">
        <button className="btn">Create New Album</button>
      </Link>
    </div>
  );
}
