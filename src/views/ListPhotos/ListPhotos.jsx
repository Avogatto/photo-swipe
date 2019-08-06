import React from "react";
import { apiFetch } from "../../utils/api";

import Header from "../../components/Header/Header.jsx";
import TaggablePhoto from "../../components/TaggablePhoto/TaggablePhoto.jsx";

import "./ListPhotos.css";

const userList = [
  { name: "Sara Rubin", email: "sara.rubin@example.com" },
  { name: "Mackenzie Turner", email: "mackenzie.turner@example.com" },
  { name: "John Smith", email: "john.smith@example.com" },
  { name: "Jane Miller", email: "jane.miller@example.com" }
];

export default class ListPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: [] };
  }

  async fetchPhotos() {
    const {
      match: {
        params: { albumId }
      }
    } = this.props;
    const { photos } = await apiFetch(`/albums/${albumId}/photos`);
    return photos || [];
  }

  async fetchUserOptions() {
    // const { userList } = await apiFetch(INSERT API CALL TO FETCH USER LIST);
    return (userList || []).map(({ name, email }) => ({
      key: email,
      text: name,
      value: email
    }));
  }

  async componentDidMount() {
    const [photos, userOptions] = await Promise.all([
      this.fetchPhotos(),
      this.fetchUserOptions()
    ]);
    this.setState({ photos, userOptions });
  }

  renderItems() {
    const { photos, userOptions } = this.state;
    const rows = [];

    for (let i = 0; i < photos.length; i += 3) {
      const rowItems = [];
      // Build each row with three columns containing the next set of three photos
      for (let j = i; j < i + 3; j += 1) {
        const photo = photos[j];
        if (photo) {
          const { baseUrl, filename, id } = photo;
          rowItems.push(
            <div className="col-1-of-3" key={id + j}>
              <TaggablePhoto
                baseUrl={baseUrl}
                filename={filename}
                id={id}
                userOptions={userOptions}
              />
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
    const { authenticated, classes, logout, ...rest } = this.props;
    // const image = 'https://media.giphy.com/media/dLswRvqOSDfEI/giphy.gif';
    const items = this.renderItems();
    return (
      <div className="list-photos">
        <Header />
        <main className="list-photos__main">
          <div className="row">
            <h1 className="list-albums__header u-margin-top-medium">Photos</h1>
          </div>
          {items}
        </main>
      </div>
    );
  }
}
