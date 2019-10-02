import React from 'react';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import AlbumCard from '../components/AlbumCard';
import { fetchAlbums } from '../utils/api';

export default class ListAlbums extends React.Component {
  constructor(props) {
    super(props);
    this.state = { albums: [], loaded: false };
  }

  async componentDidMount() {
    const albums = await fetchAlbums();
    this.setState({ albums, loaded: true });
  }

  render() {
    const { albums, loaded } = this.state;
    return (
      <Container textAlign="center">
        <Header as="h1" style={{ marginBottom: '2rem' }}>
          Albums
        </Header>
        <Card.Group centered>
          {loaded ? (
            albums.map(({ coverPhotoBaseUrl, id, title }) => (
              <AlbumCard
                key={id}
                path={`/albums/${id}`}
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
