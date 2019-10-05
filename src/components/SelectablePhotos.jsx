import React from 'react';
import {
  Button,
  Card,
  Container,
  Header,
  Icon,
  Image,
} from 'semantic-ui-react';

export default function SelectablePhotos(props) {
  const { photos, handleSelectAll, handleSelection, selections } = props;
  return (
    <Container>
      <Header as="h2">
        Select to approve
        <Button
          circular
          color="grey"
          size="medium"
          onClick={handleSelectAll}
          style={{ marginLeft: '2rem' }}
        >
          Select All
        </Button>
      </Header>
      <Card.Group centered>
        {photos.map(({ id, baseUrl, filename }) => (
          <Card
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
    </Container>
  );
}
