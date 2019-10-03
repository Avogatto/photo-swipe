import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import SwipeablePhotos from '../components/SwipeablePhotos';

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
    this.handleApproval = this.handleApproval.bind(this);
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

  handleApproval(id) {
    this.setState(({ selections }) => {
      selections.set(id);
      return { selections: new Map(selections) };
    });
  }

  render() {
    const { photos, loaded } = this.state;
    return (
      <Container textAlign="center">
        <Header as="h2" style={{ marginBottom: '3rem' }}>
          swipe right to approve, left to reject
        </Header>
        {loaded && (
          <SwipeablePhotos
            photos={photos}
            handleApproval={this.handleApproval}
          />
        )}
      </Container>
    );
  }
}
