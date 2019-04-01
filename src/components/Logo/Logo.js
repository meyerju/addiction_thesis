import React from 'react';

// import logo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        {/* <img src={logo} alt="" /> */} LOGO
    </div>
);

export default logo;