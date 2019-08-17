import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';

export default function(props) {
  const { auth } = props;
  const { image } = auth.getProfile();

  return (
    <header className="header">
      <Menu fixed="top" inverted borderless>
        <Menu.Item as={Link} to="/" header>
          Photo Swipe
        </Menu.Item>

        <Dropdown item simple text="Menu">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/users">
              Manage Users
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/albums">
              Manage Albums
            </Dropdown.Item>
            <Dropdown.Item>Create Album</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item onClick={auth.logout}>Logout</Menu.Item>

        <Menu.Item position="right">
          <Image src={image} avatar size="mini" />
        </Menu.Item>
      </Menu>
    </header>
  );
}
