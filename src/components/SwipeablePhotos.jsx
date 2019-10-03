import React from 'react';
import { Container } from 'semantic-ui-react';
import ReactSwing from 'react-swing';

const {
  DIRECTION: { RIGHT, LEFT },
} = ReactSwing;

export default class SwipeablePhotos extends React.Component {
  stackEl = React.createRef();

  constructor(props) {
    super(props);
    this.state = { stack: null };
  }

  render() {
    const { handleApproval, photos } = this.props;
    return (
      <Container textAlign="center">
        <ReactSwing
          setStack={stack => this.setState({ stack })}
          ref={this.stackEl}
        >
          {photos.map(({ id, baseUrl, filename }, key) => (
            <img
              key={key}
              ref={`card${key + 1}`}
              throwout={({ target, throwDirection }) => {
                if (throwDirection === RIGHT) {
                  console.log('YOU APPROVED');
                  handleApproval(id);
                  target.remove();
                } else if (throwDirection === LEFT) {
                  target.remove();
                }
              }}
              src={`${baseUrl}=w${400}-h${400}`}
              alt={filename}
              style={{
                maxHeight: '70vh',
                maxWidth: '80vw',
                position: 'absolute',
                left: '50%',
                transform: 'translate(-50%)',
              }}
            />
          ))}
        </ReactSwing>
      </Container>
    );
  }
}
