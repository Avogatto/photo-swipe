import React from 'react';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { fetchPhotos, fetchUserOptions } from '../../utils/api';

import TaggablePhoto from '../../components/TaggablePhoto/TaggablePhoto.jsx';

export default class ListPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: [], userOptions: null, loaded: false };
  }

  async componentDidMount() {
    const {
      match: {
        params: { albumId },
      },
    } = this.props;

    const [photos, userOptions] = await Promise.all([
      fetchPhotos(albumId),
      fetchUserOptions(),
    ]);
    this.setState({ photos, userOptions, loaded: true });
  }

  renderPhotos() {
    const { photos, userOptions } = this.state;
    const {
      match: {
        params: { albumId },
      },
    } = this.props;
    return photos.map(({ baseUrl, filename, id }) => (
      <TaggablePhoto
        baseUrl={baseUrl}
        filename={filename}
        id={id}
        albumId={albumId}
        userOptions={userOptions}
      />
    ));
  }

  render() {
    const { loaded } = this.state;
    return (
      <div className="list-photos">
        <Container text>
          <Header as="h1" style={{ marginBottom: '2rem' }}>
            Photos
          </Header>
          <Card.Group>
            {loaded ? (
              this.renderPhotos()
            ) : (
              <Loader active inline="centered" size="large" inverted>
                Loading Photos...
              </Loader>
            )}
          </Card.Group>
        </Container>
      </div>
    );
  }
}
