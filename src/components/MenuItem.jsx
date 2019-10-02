import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

export default function MenuItem(props) {
  const { label, path, icon } = props;
  return (
    <Menu.Item as={Link} to={path}>
      <p>{label}</p>
      <Icon name={icon} />
    </Menu.Item>
  );
}
