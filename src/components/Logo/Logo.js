import React from 'react';

import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        MYTRACK PLATFORM
    </div>
);

export default logo;