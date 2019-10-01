import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import MenuItem from '../components/MenuItem';

const menuProps = [
  { label: 'View Pending Approvals', path: '/pending', icon: 'thumbs up' },
];
const adminMenuProps = [
  { label: 'View Existing Albums', path: '/albums', icon: 'picture' },
  { label: 'Create New Album', path: '/create-album', icon: 'add' },
];

export default function(props) {
  const { auth } = props;
  const isAdmin = auth.isAdmin();
  const menuItems = (isAdmin
    ? menuProps.concat(adminMenuProps)
    : menuProps
  ).map((props, key) => <MenuItem key={key} {...props} />);

  return (
    <Container
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      textAlign="center"
    >
      <Menu
        icon="labeled"
        vertical
        style={{ fontSize: '1.5rem', width: '20rem' }}
      >
        {menuItems}
      </Menu>
    </Container>
  );
}
