import React from 'react';
import { Button, Card, Container, Header, Loader } from 'semantic-ui-react';
import SelectablePhoto from '../components/SelectablePhoto';
import { fetchPhotos } from '../utils/api';

export default class PhotosToApprove extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loaded: false,
      selections: new Map(),
      photos: [],
      submitted: false,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { albumId },
      },
    } = this.props;
    // TODO: change this call to fetch only photos that the user is tagged in
    const photos = await fetchPhotos(albumId);
    this.setState({ photos, loaded: true });
  }

  handleSelection(id) {
    this.setState(({ selections }) => {
      if (selections.has(id)) selections.delete(id);
      else selections.set(id);
      return { selections: new Map(selections) };
    });
  }

  handleSelectAll() {
    this.setState(({ photos, selections }) => {
      const newSelections =
        photos.length === selections.size
          ? new Map()
          : new Map(photos.map(({ id }) => [id]));
      return { selections: newSelections };
    });
  }

  handleSubmit() {
    // handle call to submit here
    this.setState({ submitted: true });
  }

  render() {
    const { loaded, photos, selections, submitted } = this.state;
    return submitted ? (
      <Container>
        <Header as="h2">
          Thank you for submitting your approvals!
          <Button circular color="grey" size="medium">
            Back to pending approvals...
          </Button>
        </Header>
      </Container>
    ) : (
      <Container text textAlign="center">
        <Header as="h2">
          Select to approve
          <Button
            circular
            color="grey"
            size="medium"
            onClick={this.handleSelectAll}
            style={{ marginLeft: '2rem' }}
          >
            Select All
          </Button>
        </Header>
        <Card.Group centered>
          {loaded ? (
            photos.map(({ id, baseUrl, filename }) => (
              <SelectablePhoto
                key={id}
                id={id}
                baseUrl={baseUrl}
                checked={selections.has(id)}
                handleSelection={this.handleSelection}
              />
            ))
          ) : (
            <Loader active inline="centered" size="large" inverted>
              Loading Photos...
            </Loader>
          )}
        </Card.Group>
        <Button
          circular
          size="big"
          color="black"
          onClick={this.handleSubmit}
          style={{ margin: '2rem auto' }}
        >
          Submit
        </Button>
      </Container>
    );
  }
}
