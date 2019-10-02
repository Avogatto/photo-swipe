import React from 'react';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { fetchPhotos, fetchUserOptions, shareAlbum } from '../utils/api';

import TaggablePhoto from '../components/TaggablePhoto.jsx';

export default class ListPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      userOptions: null,
      loaded: false,
    };
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
    return photos.map(({ baseUrl, filename, id }) => (
      <TaggablePhoto
        key={id}
        baseUrl={baseUrl}
        filename={filename}
        id={id}
        userOptions={userOptions}
      />
    ));
  }

  async handleClick() {
    const {
      match: {
        params: { albumId },
      },
    } = this.props;
    const { shareUser } = this.state;
    await shareAlbum(albumId, shareUser);
    console.log('success!!');
  }

  render() {
    const { loaded } = this.state;
    return (
      <Container textAlign="center">
        <Header as="h1" style={{ marginBottom: '2rem' }}>
          Photos
        </Header>
        <Card.Group centered>
          {loaded ? (
            this.renderPhotos()
          ) : (
            <Loader active inline="centered" size="large">
              Loading Photos...
            </Loader>
          )}
        </Card.Group>
      </Container>
    );
  }
}
