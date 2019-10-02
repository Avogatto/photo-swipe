import React from 'react';
import { Card, Dropdown, Image } from 'semantic-ui-react';
import { fetchTaggedUsers, updateTaggedUsers } from '../utils/api';

export default class TaggablePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.updateTaggedUsers = this.updateTaggedUsers.bind(this);
    this.state = { taggedUsers: [] };
  }

  async componentDidMount() {
    const { id: photoId, albumId } = this.props;

    try {
      const taggedUsers = await fetchTaggedUsers(albumId, photoId);
      this.setState({ taggedUsers });
    } catch (err) {
      console.error(err);
    }
  }

  async updateTaggedUsers(e, { value: taggedUsers }) {
    const { id: photoId, albumId } = this.props;
    this.setState({ taggedUsers });
    try {
      const result = await updateTaggedUsers(albumId, photoId, taggedUsers);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { baseUrl, id, userOptions } = this.props;
    const { taggedUsers } = this.state;

    return (
      <Card key={id}>
        <Image src={`${baseUrl}=w${800}-h${800}`} rounded fluid />
        <Card.Content extra>
          <Dropdown
            onChange={this.updateTaggedUsers}
            text="tag users"
            multiple
            selection
            options={userOptions}
            value={taggedUsers}
          />
        </Card.Content>
      </Card>
    );
  }
}
