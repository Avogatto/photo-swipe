import React from 'react';
import { Card, Dropdown, Image } from 'semantic-ui-react';
import { fetchTaggedUsers } from '../../utils/api';

/* TO BE REPLACED BY REAL STUFF LATER */
const taggedUsers = [{ name: 'Sara Rubin', email: 'sara.rubin@example.com' }];

export default class TaggablePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: [] };
  }

  async componentDidMount() {
    const {
      match: {
        params: { albumId, photoId },
      },
    } = this.props;
    try {
      const taggedUsers = await fetchTaggedUsers(albumId, photoId);
      const value = taggedUsers;
      this.setState({ value });
    } catch (err) {
      console.error(err);
    }
    
  }

  async updateValue(value) {
    await updateTaggedUsers
    console.log('you updated the value in firebase', value);
  }

  async handleChange(e, { value }) {
    await this.updateValue(value);
    this.setState({ value });
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
