import React from 'react';
import { Button, Container, Header, Loader } from 'semantic-ui-react';
import SelectablePhotos from '../components/SelectablePhotos';
import SwipeablePhotos from '../components/SwipeablePhotos';
import { fetchPhotos } from '../utils/api';

// const submittedView = (
//   <Container>
//     <Header as="h2">
//       Thank you for submitting your approvals!
//       <Button circular color="grey" size="medium">
//         Back to pending approvals...
//       </Button>
//     </Header>
//   </Container>
// );

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
        <SelectablePhotos
          photos={photos}
          selections={selections}
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
    const { photos } = this.state;
    return (
      <Container textAlign="center" style={{ position: 'relative' }}>
        <Header as="h2" style={{ marginBottom: '3rem' }}>
          swipe right to approve, left to reject
        </Header>
        <SwipeablePhotos
          photos={photos}
          handleSelection={this.handleSelection}
        />
      </Container>
    );
  }

  render() {
    const {
      match: {
        params: { style },
      },
    } = this.props;
    const { loaded } = this.state;

    return loaded ? (
      style === 'swipe' ? (
        this.renderSwipeView()
      ) : (
        this.renderBatchView()
      )
    ) : (
      <Loader active inline="centered" size="large">
        Loading Photos...
      </Loader>
    );
  }
}
