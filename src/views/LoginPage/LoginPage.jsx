import React from "react";
import { Redirect } from "react-router-dom";
import OAuth from "../../components/OAuth/OAuth.jsx";
import "./LoginPage.css";

export default function(props) {
  const { authenticated, location, login, socket } = props;
  const { from } = location.state || { from: { pathname: "/" } };

  if (authenticated === true) {
    return <Redirect to={from} />;
  }

  return (
    <div className="container">
      <h1 className="heading">
        <span className="heading-section">Photo</span>
        <span className="heading-section">Swipe</span>
      </h1>
      <OAuth login={login} socket={socket} />
    </div>
  );
}
