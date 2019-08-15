import React from 'react';
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';

export default class AddUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      email: '',
      admin: false,
      submitted: false,
    };
  }

  async handleSubmit() {
    console.log('you submitted this!!!', this.state);
    const { updateUserList } = this.props;
    // MAKE API CALL TO ADD USER HERE
    await updateUserList();
    this.setState({
      name: '',
      email: '',
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
    const { name, email, admin, submitted } = this.state;

    return (
      <div className="test-view">
        <Form success={submitted} onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Full name"
              placeholder="Full name"
              name="name"
              value={name}
              onChange={this.handleInputChange}
              required
            />
            <Form.Field
              control={Input}
              label="Email"
              placeholder="Email"
              name="email"
              type="email"
              value={email}
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
