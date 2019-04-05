import React from 'react';

import classes from './Page.css';

const page = (props) => (
    <main className={classes.page}>
        {props.children}
    </main>
);

export default page;