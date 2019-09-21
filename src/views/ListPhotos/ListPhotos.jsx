import React from 'react';
import { apiFetch, fetchUserOptions } from '../../utils/api';

import TaggablePhoto from '../../components/TaggablePhoto/TaggablePhoto.jsx';

import './ListPhotos.css';

export default class ListPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: [] };
  }

  async fetchPhotos() {
    const {
      match: {
        params: { albumId },
      },
    } = this.props;
    const { photos } = await apiFetch(`/albums/${albumId}/photos`);
    return photos || [];
  }

  async componentDidMount() {
    const [photos, userOptions] = await Promise.all([
      this.fetchPhotos(),
      fetchUserOptions(),
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
    const items = this.renderItems();
    return (
      <div className="list-photos">
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
