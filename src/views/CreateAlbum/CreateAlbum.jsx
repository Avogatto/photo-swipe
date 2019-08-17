import React from 'react';
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  Message,
} from 'semantic-ui-react';

import { createAlbum } from '../../utils/api';

export default class CreateAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = { albumTitle: '', submitted: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value, submitted: false });
  }

  async handleSubmit() {
    const { albumTitle } = this.state;
    await createAlbum({ albumTitle });
    this.setState({ albumTitle: '', submitted: true });
  }

  render() {
    const { albumTitle, submitted } = this.state;

    return (
      <div className="create-album">
        <Container text style={{ marginTop: '11rem' }}>
          <Header as="h1">Create New Album</Header>
          <Form
            success={submitted}
            onSubmit={this.handleSubmit}
            autocomplete="off"
          >
            <Form.Field
              control={Input}
              label="Album Title"
              placeholder="Album Title"
              name="albumTitle"
              value={albumTitle}
              onChange={this.handleChange}
              required
            />
            <Message
              success
              header="Created"
              content="Successfully created album"
            />
            <Form.Field control={Button}>Create</Form.Field>
          </Form>
        </Container>
      </div>
    );
  }
}
