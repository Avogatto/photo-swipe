import React from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../utils/api";

import Header from "../../components/Header/Header.jsx";

export default class ListAlbums extends React.Component {
  constructor(props) {
    super(props);
    this.state = { albums: [] };
  }

  async componentDidMount() {
    const { albums } = await apiFetch(`/albums`);
    const [album] = albums;

    for (let i = 0; i < 7; i += 1) {
      albums.push(album);
    }

    this.setState({ albums: albums || [] });
  }

  renderItems() {
    const { albums } = this.state;
    const rows = [];

    for (let i = 0; i < albums.length; i += 3) {
      const rowItems = [];
      // Build each row with three columns containing the next set of three albums
      for (let j = i; j < i + 3; j += 1) {
        const album = albums[j];
        if (album) {
          const { coverPhotoBaseUrl, id, title } = album;
          rowItems.push(
            <div className="col-1-of-3" key={id + j}>
              <figure>
                <Link to={`/albums/${id}/photos`}>
                  <img src={`${coverPhotoBaseUrl}=w${300}-h${300}`} alt={id} />
                  <figcaption>{title}</figcaption>
                </Link>
              </figure>
            </div>
          );
        }
      }
      rows.push(
        <div className="row" key={i}>
          {rowItems}
        </div>
      );
    }
    return rows;
  }

  render() {
    // const { authenticated, classes, logout, ...rest } = this.props;
    const items = this.renderItems();
    return (
      <div className="list-albums">
        <Header />
        <main className="list-albums__main">
          <div className="row">
            <h1 className="list-albums__header u-margin-top-medium">Albums</h1>
          </div>
          {items}
        </main>
      </div>
    );
  }
}
