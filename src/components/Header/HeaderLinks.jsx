/*eslint-disable*/
import React from 'react';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { Apps } from '@material-ui/icons';

// core components
import CustomDropdown from '../CustomDropdown/CustomDropdown.jsx';
import Button from '../CustomButtons/Button.jsx';

import headerLinksStyle from '../../assets/jss/material-kit-react/components/headerLinksStyle.jsx';

function HeaderLinks({ ...props }) {
  const { authenticated, classes, logout } = props;
  return (
    <List className={classes.list}>
      { authenticated && <div>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText='Components'
            buttonProps={{
              className: classes.navLink,
              color: 'transparent'
            }}
            buttonIcon={Apps}
            dropdownList={[
              <Link to='/' className={classes.dropdownLink}>
                All components
              </Link>,
              <a
                href='https://creativetimofficial.github.io/material-kit-react/#/documentation'
                target='_blank'
                className={classes.dropdownLink}
                >
                Documentation
              </a>
            ]}
            />
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            className={classes.navLink}
            onClick={logout}
            color='transparent'>
            Log Out
          </Button>
        </ListItem>
      </div>}
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
