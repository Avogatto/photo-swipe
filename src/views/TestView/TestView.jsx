import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import TopBar from '../../components/Header/Header.jsx';

export default class TestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="test-view">
        <Container text style={{ marginTop: '11rem' }}>
          <Header as="h1">TestView</Header>
        </Container>
      </div>
    );
  }
}
