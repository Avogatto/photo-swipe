import React from 'react';
import { Container, Dropdown, Header } from 'semantic-ui-react';
import { fetchUserOptions } from '../../utils/api';

import TopBar from '../../components/Header/Header.jsx';
import AddUserForm from '../../components/AddUserForm/AddUserForm.jsx';

export default class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.updateUserList = this.updateUserList.bind(this);
    this.state = {
      userOptions: [],
    };
  }

  async updateUserList() {
    const userOptions = await fetchUserOptions();
    this.setState({ userOptions });
  }

  async componentDidMount() {
    await this.updateUserList();
  }

  render() {
    const { userOptions } = this.state;

    return (
      <div className="test-view">
        <TopBar />
        <Container text style={{ marginTop: '11rem' }}>
          <Header as="h1">Search existing users</Header>
          <Dropdown
            placeholder="Full name"
            fluid
            search
            selection
            options={userOptions}
          />
          <Header as="h1">Add authorized users</Header>
          <AddUserForm updateUserList={this.updateUserList} />
        </Container>
      </div>
    );
  }
}
