import React from 'react';
import { Button, Card, Container, Header, Loader } from 'semantic-ui-react';
import SelectablePhoto from '../components/SelectablePhoto';

const MOCK_SRC =
  'https://firebasestorage.googleapis.com/v0/b/take-my-stufff.appspot.com/o/items%2Fimg1.jpeg?alt=media&token=9400f530-9f30-4e18-a65d-8cebe9b64e68';
const mockData = [
  { id: 1, baseUrl: MOCK_SRC, filename: 'FILENAME' },
  { id: 2, baseUrl: MOCK_SRC, filename: 'FILENAME' },
  { id: 3, baseUrl: MOCK_SRC, filename: 'FILENAME' },
  { id: 4, baseUrl: MOCK_SRC, filename: 'FILENAME' },
];

export default class TestView extends React.Component {
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
    // fetch data on photos to approve here
    this.setState({ photos: mockData, loaded: true });
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
