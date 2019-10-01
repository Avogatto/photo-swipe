import React from 'react';
import { Card, Dropdown, Image } from 'semantic-ui-react';
import { fetchTaggedUsers, updateTaggedUsers } from '../../utils/api';

export default class TaggablePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: [] };
  }

  async componentDidMount() {
    const { id: photoId, albumId } = this.props;

    try {
      const taggedUsers = await fetchTaggedUsers(albumId, photoId);
      this.setState({ value: taggedUsers });
    } catch (err) {
      console.error(err);
    }
  }

  async handleChange(e, { value }) {
    const { id: photoId, albumId } = this.props;
    this.setState({ value });
    await updateTaggedUsers(albumId, photoId, value);
  }

  render() {
    const { baseUrl, filename, id, userOptions } = this.props;
    const { value } = this.state;

    return (
      <Card key={id}>
        <Card.Content textAlign="center">
          <Image src={`${baseUrl}=w${300}-h${300}`} />
          <Card.Description style={{ marginTop: '1rem' }}>
            {filename}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Dropdown
            onChange={this.handleChange}
            placeholder="Tagged Users"
            fluid
            multiple
            selection
            options={userOptions}
            value={value}
          />
        </Card.Content>
      </Card>
    );
  }
}
