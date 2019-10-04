import React from 'react';
import ReactSwing from 'react-swing';

const {
  DIRECTION: { RIGHT, LEFT },
} = ReactSwing;

export default class SwipeablePhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stack: null };
  }

  render() {
    const { handleApproval, photos } = this.props;
    return (
      <ReactSwing setStack={stack => this.setState({ stack })}>
        {photos.map(({ id, baseUrl, filename }, key) => (
          <img
            key={key}
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
              right: 0,
              left: 0,
              margin: 'auto',
            }}
          />
        ))}
      </ReactSwing>
    );
  }
}
