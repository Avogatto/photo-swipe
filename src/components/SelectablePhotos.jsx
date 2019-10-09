import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

export default function SelectablePhotos(props) {
  const { photos, handleSelection, selections } = props;
  return (
    <Card.Group centered>
      {photos.map(({ id, baseUrl, filename }) => (
        <Card
          key={id}
          onClick={() => handleSelection(id)}
          style={{ boxShadow: 'none' }}
        >
          <Image src={`${baseUrl}=w${800}-h${800}`} fluid />
          {selections.has(id) && (
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
      ))}
    </Card.Group>
  );
}
