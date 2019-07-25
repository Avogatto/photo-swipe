import React from "react";
import { Redirect } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";

import "./TestView.css";

export default function(props) {
  return (
    <div className="test-view">
      <Header />
      <main className="test-view__main u-center-vertical u-center-text">
        <div className="row">
          <button className="btn">Vasdfssadfsd</button>
        </div>
        <div className="row">
          <div className="col-1-of-1">
            <button className="btn">Casfsdfdsds</button>
          </div>
        </div>
      </main>
    </div>
  );
}
