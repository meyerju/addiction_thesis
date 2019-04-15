import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    patients: [],
    loading: false,
    purchased: false,
    patient: null,
};

const fetchPatientsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchPatientsSuccess = ( state, action ) => {
    return updateObject( state, {
        patients: action.patients,
        loading: false
    } );
};

const fetchPatientsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const chosePatient = ( state, action ) => {
    console.log(action)
    return updateObject( state, { patient: action.patient } );
};

const reducer = ( state = initialState, action ) => {
    console.log(action)
    switch ( action.type ) {
        case actionTypes.FETCH_PATIENTS_START: return fetchPatientsStart( state, action );
        case actionTypes.FETCH_PATIENTS_SUCCESS: return fetchPatientsSuccess( state, action );
        case actionTypes.FETCH_PATIENTS_FAIL: return fetchPatientsFail( state, action );
        case actionTypes.CHOSE_PATIENT: return chosePatient( state, action );
        default: return state;
    }
};

export default reducer;