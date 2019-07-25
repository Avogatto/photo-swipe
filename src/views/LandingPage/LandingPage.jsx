import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header.jsx";

export default function(props) {
  const { authenticated, classes, logout, ...rest } = props;
  return (
    <div className="landing-page">
      <Header />
      <main className="landing-page__content u-center-vertical u-center-text">
        <div className="row">
          <Link to="/list-albums">
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
