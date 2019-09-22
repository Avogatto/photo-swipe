import React from 'react';
import { Card, Dropdown, Image } from 'semantic-ui-react';

/* TO BE REPLACED BY REAL STUFF LATER */
const taggedUsers = [{ name: 'Sara Rubin', email: 'sara.rubin@example.com' }];

export default class TaggablePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: [] };
  }

  async componentDidMount() {
    // const { taggedUsers } = await fetch(INSERT API CALL FOR PHOTO'S TAGGED USERS HERE);
    const value = (taggedUsers || []).map(({ email }) => email);
    this.setState({ value });
  }

  async updateValue(value) {
    // TODO: UPDATE VALUE IN FIREBASE HERE!!!!!!
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
