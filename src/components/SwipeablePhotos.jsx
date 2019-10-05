import React from 'react';
import ReactSwing from 'react-swing';

const {
  DIRECTION: { RIGHT, LEFT },
} = ReactSwing;

function throwOutConfidence(xOffset, yOffset, element) {
  const xConfidence = Math.min(
    Math.abs(xOffset) / (element.offsetWidth / 2),
    1
  );
  const yConfidence = Math.min(
    Math.abs(yOffset) / (element.offsetHeight / 2),
    1
  );
  return Math.max(xConfidence, yConfidence);
}

export default class SwipeablePhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stack: null };
  }

  render() {
    const { handleSelection, photos } = this.props;
    return (
      <ReactSwing
        config={{ throwOutConfidence }}
        setStack={stack => this.setState({ stack })}
      >
        {photos.map(({ id, baseUrl, filename }, key) => (
          <img
            key={key}
            throwout={({ target, throwDirection }) => {
              if (throwDirection === RIGHT) {
                console.log('YOU APPROVED');
                handleSelection(id);
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
