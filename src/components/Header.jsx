import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';

const dropdownProps = [
  { text: 'Manage Users', path: '/users' },
  { text: 'View Albums', path: '/albums' },
  { text: 'Create Album', path: '/create-album' },
  { text: 'View Pending', path: '/pending' },
];

export default function(props) {
  const { auth } = props;
  const { image } = auth.getProfile();
  const isAdmin = auth.isAdmin();

  const menu = isAdmin ? (
    <Dropdown item simple text="Menu">
      <Dropdown.Menu>
        {dropdownProps.map(({ text, path }, key) => (
          <Dropdown.Item key={key} as={Link} to={path}>
            {text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    <Menu.Item as={Link} to="/pending">
      View Pending
    </Menu.Item>
  );

  return (
    <Container style={{ marginBottom: '8rem' }}>
      <Menu fixed="top" inverted borderless>
        <Menu.Item as={Link} to="/" header>
          Photo Swipe
        </Menu.Item>
        {menu}
        <Menu.Item onClick={auth.logout}>Logout</Menu.Item>
        <Menu.Item position="right">
          <Image src={image} avatar size="mini" />
        </Menu.Item>
      </Menu>
    </Container>
  );
}
