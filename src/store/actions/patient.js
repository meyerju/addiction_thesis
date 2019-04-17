import * as actionTypes from './actionTypes';
import axios from '../../axios-patients';

export const fetchPatientsSuccess = (fetchedPatients) => {
    return {
        type: actionTypes.FETCH_PATIENTS_SUCCESS,
        patients: fetchedPatients
    };
};

export const fetchPatientsFail = (error) => {
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
      
    };
};

export const chosePatient = (patient) => {
    return dispatch => {
        dispatch(getPatient(patient));
    }
};

export const getPatient = (patient) => {
    return {
        type: actionTypes.CHOSE_PATIENT,
        patient: patient
    };
};