import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

export default function AlbumCard(props) {
  const { imgSrc, path, title } = props;
  return (
    <Card as={Link} to={path}>
      <Image src={`${imgSrc}=w${800}-h${800}`} rounded fluid />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
      </Card.Content>
    </Card>
  );
}
