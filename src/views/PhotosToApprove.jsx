import React from 'react';
import { Button, Container, Header, Icon, Menu } from 'semantic-ui-react';
import SelectablePhotos from '../components/SelectablePhotos';
import SwipeablePhotos from '../components/SwipeablePhotos';
import { fetchPhotos } from '../utils/api';

const submittedView = (
  <Container>
    <Header as="h2">
      Thank you for submitting your approvals!
      <Button circular color="grey" size="medium">
        Back to pending approvals...
      </Button>
    </Header>
  </Container>
);

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
      view: 'menu',
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

  renderBatchView() {
    const { photos, selections } = this.state;
    return (
      <Container textAlign="center">
        <SelectablePhotos
          photos={photos}
          selections={selections}
          handleSelectAll={this.handleSelectAll}
          handleSelection={this.handleSelection}
        />
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

  renderSwipeView() {
    const { photos, selections } = this.state;
    return (
      <Container textAlign="center">
        <SelectablePhotos
          photos={photos}
          selections={selections}
          handleSelectAll={this.handleSelectAll}
          handleSelection={this.handleSelection}
        />
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

  renderMenuView() {
    return (
      <Container textAlign="center">
        <Menu
          icon="labeled"
          vertical
          style={{ fontSize: '1.5rem', width: '20rem' }}
        >
          <Menu.Item
            onClick={() => {
              this.setState({ view: 'swipe' });
            }}
          >
            <p>Review by Swiping</p>
            <Icon name="square" />
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              this.setState({ view: 'batch' });
            }}
          >
            <p>Batch Review</p>
            <Icon name="square" />
          </Menu.Item>
        </Menu>
      </Container>
    );
  }

  render() {
    const { photos, view } = this.state;
    switch (view) {
      case 'submitted':
        return submittedView;
      case 'batch':
        return this.renderBatchView();
      case 'swipe':
        return (
          <SwipeablePhotos
            photos={photos}
            handleSelection={this.handleSelection}
          />
        );
      default:
        return this.renderMenuView();
    }
  }
}
