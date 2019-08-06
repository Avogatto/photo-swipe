import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

export default function(props) {
  return (
    <header className="header">
      <div className="header__nav">
        <FontAwesomeIcon icon={faBars} size="5x" />
      </div>
      <div className="header__avatar-box">
        <img
          src="https://media.giphy.com/media/xTiQyi2MvVQR1V3PLW/giphy.gif"
          alt="avatar"
          className="header__avatar-image"
        />
      </div>
    </header>
  );
}
