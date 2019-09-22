import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Header, Image, Loader } from 'semantic-ui-react';
import { fetchAlbums } from '../../utils/api';

export default class ListAlbums extends React.Component {
  constructor(props) {
    super(props);
    this.state = { albums: [], loaded: false };
  }

  async componentDidMount() {
    const albums = await fetchAlbums();
    this.setState({ albums, loaded: true });
  }

  renderAlbums() {
    const { albums } = this.state;
    return albums.map(({ coverPhotoBaseUrl, id, title }, key) => (
      <Card key={key}>
        <Card.Content textAlign="center">
          <Link to={`/albums/${id}/photos`}>
            <Image src={`${coverPhotoBaseUrl}=w${300}-h${300}`} />
            <Card.Description
              style={{ fontWeight: 'bold', marginTop: '1rem', color: 'grey' }}
            >
              {title}
            </Card.Description>
          </Link>
        </Card.Content>
      </Card>
    ));
  }

  render() {
    const { loaded } = this.state;
    return (
      <div className="list-albums">
        <Container text>
          <Header as="h1" style={{ marginBottom: '2rem' }}>
            Albums
          </Header>
          <Card.Group>
            {loaded ? (
              this.renderAlbums()
            ) : (
              <Loader active inline="centered" size="large" inverted>
                Loading Albums...
              </Loader>
            )}
          </Card.Group>
        </Container>
      </div>
    );
  }
}
