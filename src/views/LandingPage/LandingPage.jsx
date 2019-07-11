import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import HeaderLinks from '../../components/Header/HeaderLinks.jsx';
import Parallax from '../../components/Parallax/Parallax.jsx';

import landingPageStyle from '../../assets/jss/material-kit-react/views/landingPage.jsx';
import typographyStyle from '../../assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx';

import { apiFetch } from '../../utils';

const { REACT_APP_API_BASE: API_BASE } = process.env;
const dashboardRoutes = [];
const albumId = 'ADABQEVrj8uJJ39tWba0EIcxQgWKu5c_mvFTvFdvpvKAVzoxwslBYcAI0mINDsHfazSQWiri__1M';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: [] };
  }

  async componentDidMount() {
    const { photos } = await apiFetch(`/albums/${albumId}/photos`);
    this.setState({ photos });
  }

  renderItems() {
    const { photos } = this.state;
    const { classes } = this.props;
    return photos.map(({ id, baseUrl }) => (
      <GridItem xs={12} sm={6} key={id} >
        <img
          src={`${baseUrl}=w${1000}-h${1000}`}
          alt='...'
          className={classes.imgRounded + ' ' + classes.imgFluid}
        />
        <div className={classes.space50} />
      </GridItem>
    ));
  }

  render() {
    const { authenticated, classes, logout, ...rest } = this.props;
    // const image = 'https://media.giphy.com/media/dLswRvqOSDfEI/giphy.gif';
    const items = this.renderItems();
    return (
      <div>
        <Header
          color='transparent'
          routes={dashboardRoutes}
          brand='Photo Swipe'
          rightLinks={<HeaderLinks authenticated={authenticated} logout={logout}/>}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: 'white'
          }}
          {...rest}
        />
        <Parallax>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Getting Started</h1>
                <h4>
                  First create an album or add tags to existing albums before submitting.
                </h4>
                <br />
                <Button
                  color='danger'
                  size='lg'
                  href={`${API_BASE}/albums`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Get Albums
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.section}>
            <div className={classes.container}>
              <div id='Albums'>
                <div className={classes.title}>
                  <h2>Albums</h2>
                </div>
                <br />
                <GridContainer>
                  {items}
                </GridContainer>
                <GridContainer />
              </div>
              <div className={classes.space50} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles({ ...landingPageStyle, ...typographyStyle })(LandingPage);
