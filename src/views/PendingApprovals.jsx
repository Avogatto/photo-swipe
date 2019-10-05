import React from 'react';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import AlbumCard from '../components/AlbumCard';
import { fetchSharedAlbums } from '../utils/api';

export default class PhotosToApprove extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, albums: [] };
  }

  async componentDidMount() {
    const albums = await fetchSharedAlbums();
    // TODO this need to be filtered to a list of albums that are ACTIVE
    this.setState({ albums, loaded: true });
  }

  render() {
    const { albums, loaded } = this.state;
    return (
      <Container textAlign="center">
        <Header as="h2" style={{ marginBottom: '3rem' }}>
          select album to approve photos
        </Header>
        <Card.Group centered>
          {loaded ? (
            albums.map(({ coverPhotoBaseUrl, id, title }) => (
              <AlbumCard
                key={id}
                path={`/pending/${id}`}
                imgSrc={coverPhotoBaseUrl}
                title={title}
              />
            ))
          ) : (
            <Loader active inline="centered" size="large">
              Loading Albums...
            </Loader>
          )}
        </Card.Group>
      </Container>
    );
  }
}
