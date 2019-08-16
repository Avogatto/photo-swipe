import React from 'react';
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';
import { createUser } from '../../utils/api';

export default class AddUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      fullName: '',
      userEmail: '',
      admin: false,
      submitted: false,
    };
  }

  async handleSubmit() {
    const { updateUserList } = this.props;
    const { fullName, userEmail, admin } = this.state;

    await createUser({ fullName, userEmail, admin });
    await updateUserList();

    this.setState({
      fullName: '',
      userEmail: '',
      admin: false,
      submitted: true,
    });
  }

  async handleInputChange(e, { name, value }) {
    this.setState({ [name]: value, submitted: false });
  }

  async handleCheckChange(e, { name, checked }) {
    this.setState({ [name]: checked, submitted: false });
  }

  render() {
    const { fullName, userEmail, admin, submitted } = this.state;

    return (
      <div className="test-view">
        <Form success={submitted} onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Full name"
              placeholder="Full name"
              name="fullName"
              value={fullName}
              onChange={this.handleInputChange}
              required
            />
            <Form.Field
              control={Input}
              label="Email"
              placeholder="Email"
              name="userEmail"
              type="email"
              value={userEmail}
              onChange={this.handleInputChange}
              required
            />
          </Form.Group>
          <Form.Field
            control={Checkbox}
            label="Admin"
            name="admin"
            checked={admin}
            onChange={this.handleCheckChange}
          />
          <Message
            success
            header="Submitted"
            content="Successfully added authorized user"
          />
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </div>
    );
  }
}
