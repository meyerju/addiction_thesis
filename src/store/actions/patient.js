import * as actionTypes from './actionTypes';
import axios from '../../axios-patients';
import { URL_API } from '../environnement/environnement';

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
    let error = null;
    return dispatch => {
        axios.get(URL_API+"/patients/"+userId)
        .catch(err => {
            error = err;
            dispatch(fetchPatientsFail(err));
        })
        .then(res => {
            if(!error){
                dispatch(fetchPatientsSuccess(res.data));
            }
         });
      
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