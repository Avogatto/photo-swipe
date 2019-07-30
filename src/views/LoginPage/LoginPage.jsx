import React from 'react';
import { Redirect } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Header from '../../components/Header/Header.jsx';
import HeaderLinks from '../../components/Header/HeaderLinks.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import OAuth from '../../custom/OAuth.jsx';

import loginPageStyle from '../../assets/jss/material-kit-react/views/loginPage.jsx';

class LoginPage extends React.Component {
  render() {
    const { authenticated, location, login, socket } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };

    if (authenticated === true) {
      return <Redirect to={from} />
    }

    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color='transparent'
          brand='Photo Swipe'
          rightLinks={<HeaderLinks authenticated={authenticated} />}
          {...rest}
        />
        <div className={classes.pageHeader}>
          <div className={classes.container}>
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={4}>
                <OAuth login={login} socket={socket} />
              </GridItem>
            </GridContainer>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
