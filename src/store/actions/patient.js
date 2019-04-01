import * as actionTypes from './actionTypes';
import axios from '../../axios-patients';

export const fetchPatientsSuccess = ( fetchedPatients ) => {
    return {
        type: actionTypes.FETCH_PATIENTS_SUCCESS,
        patients: fetchedPatients
    };
};

export const fetchPatientsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PATIENTS_FAIL,
        error: error
    };
};

export const fetchPatientsStart = () => {
    return {
        type: actionTypes.FETCH_PATIENTS_START
    };
};

export const fetchPatients = (token, userId) => {
    return dispatch => {
        dispatch(fetchPatientsStart());
        axios.get( '/patients.json')
            .then( res => {
                const fetchedPatients = [];
                for ( let key in res.data ) {
                    fetchedPatients.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchPatientsSuccess(fetchedPatients));
            } )
            .catch( err => {
                dispatch(fetchPatientsFail(err));
            } );
    };
};