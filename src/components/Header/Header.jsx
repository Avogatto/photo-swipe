import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';

import './Header.css';

export default function(props) {
  return (
    <header className="header">
      <Menu
        fixed="top"
        inverted
        style={{
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        <Container>
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
        </Container>
        <Image
          src="https://media.giphy.com/media/xTiQyi2MvVQR1V3PLW/giphy.gif"
          size="small"
          style={{
            objectFit: 'cover',
            clipPath: 'circle(35% at 50% 50%)',
          }}
        />
      </Menu>
    </header>
  );
}
