import React from "react";
import { Dropdown } from "semantic-ui-react";
import { apiFetch } from "../../utils/api";

const { REACT_APP_API_BASE: API_BASE } = process.env;

/* TO BE REPLACED BY REAL STUFF LATER */
const taggedUsers = [{ name: "Sara Rubin", email: "sara.rubin@example.com" }];

export default class TaggablePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: [] };
  }

  async componentDidMount() {
    // const { taggedUsers } = await apiFetch(INSERT API CALL FOR PHOTO'S TAGGED USERS HERE);
    const value = (taggedUsers || []).map(({ email }) => email);
    this.setState({ value });
  }

  async updateValue(value) {
    // TODO: UPDATE VALUE IN FIREBASE HERE!!!!!!
    console.log("you updated the value in firebase", value);
  }

  async handleChange(e, { value }) {
    await this.updateValue(value);
    this.setState({ value });
  }

  render() {
    const { baseUrl, filename, id, userOptions } = this.props;
    const { value } = this.state;

    return (
      <div className="taggable-photo" key={id}>
        <figure className="taggable-photo__figure">
          <img
            className="taggable-photo__img"
            src={`${baseUrl}=w${300}-h${300}`}
            alt="..."
          />
          <figcaption className="taggable-photo__caption">
            {filename}
          </figcaption>
        </figure>
        <Dropdown
          onChange={this.handleChange}
          placeholder="Tagged Users"
          fluid
          multiple
          selection
          options={userOptions}
          value={value}
        />
      </div>
    );
  }
}
