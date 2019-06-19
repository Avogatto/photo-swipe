import React from "react";

const { REACT_APP_API_BASE: API_BASE } = process.env;

export default class LandingPage extends React.Component {
  render() {
    const { authenticated, classes, logout, ...rest } = this.props;
    return <div />;
  }
}
