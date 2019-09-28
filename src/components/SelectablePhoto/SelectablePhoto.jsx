import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

export default function SelectablePhoto(props) {
  const { baseUrl, checked, handleSelection, id } = props;
  return (
    <Card onClick={() => handleSelection(id)} style={{ cursor: 'pointer' }}>
      <Image src={`${baseUrl}=w${300}-h${300}`} rounded fluid />
      {checked && (
        <Icon
          size="huge"
          name="check circle"
          style={{
            color: 'rgba(255,255,255,.7)',
            position: 'absolute',
            top: '15px',
            right: '10px',
          }}
        />
      )}
    </Card>
  );
}
