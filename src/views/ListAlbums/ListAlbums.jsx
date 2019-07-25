import React from "react";
import { apiFetch } from "../../utils/api";

import Header from "../../components/Header/Header.jsx";

import "./ListAlbums.css";

const { REACT_APP_API_BASE: API_BASE } = process.env;
const dashboardRoutes = [];
const albumId =
  "ADABQEVrj8uJJ39tWba0EIcxQgWKu5c_mvFTvFdvpvKAVzoxwslBYcAI0mINDsHfazSQWiri__1M";

export default class ListAlbums extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: [] };
  }

  async componentDidMount() {
    const { photos } = await apiFetch(`/albums/${albumId}/photos`);
    console.log("this is photos", photos);

    this.setState({ photos: photos || [] });
  }

  renderItems() {
    const { photos } = this.state;
    return photos.map(({ id, baseUrl }, index) => (
      <img src={`${baseUrl}=w${1000}-h${1000}`} alt="..." />
    ));
  }

  render() {
    const { authenticated, classes, logout, ...rest } = this.props;
    // const image = 'https://media.giphy.com/media/dLswRvqOSDfEI/giphy.gif';
    const items = this.renderItems();
    return (
      <div className="list-albums">
        <Header />
        <main className="list-albums__main">
          <h1 className="list-albums__header">Albums</h1>
          {items}
        </main>
      </div>
    );
  }
}
