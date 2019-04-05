import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            :
            <React.Fragment>
                <NavigationItem link="/" exact>Patients</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </React.Fragment>
        }
    </ul>
);

export default navigationItems;