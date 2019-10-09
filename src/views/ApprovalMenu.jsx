import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import MenuItem from '../components/MenuItem';

export default function ApprovalMenu(props) {
  const {
    match: {
      params: { albumId },
    },
  } = props;
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
        <MenuItem
          label="Review by Swiping"
          path={`/pending/${albumId}/swipe`}
          icon="hotjar"
        />
        <MenuItem
          label="Edit Decisions"
          path={`/pending/${albumId}/edit`}
          icon="pencil"
        />
      </Menu>
    </Container>
  );
}
