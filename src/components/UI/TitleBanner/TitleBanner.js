import React from 'react';

import classes from './TitleBanner.css';

const titlebanner = (props) => (
    <div className={classes.TitleBanner}>
        <p className={classes.Title}>
            {props.title.toUpperCase()}
        </p>
    </div>
);

export default titlebanner;