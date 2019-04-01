import React from 'react';

import classes from './Patient.css';

const patient = (props) => {

    return (
        <div className={classes.Patient}>
            <p>
                <span className={classes.Tag}>{props.patient.name} </span>
                <span className={classes.Tag}>{props.patient.surname} </span>
            </p>
        </div>
    );
};

export default patient;