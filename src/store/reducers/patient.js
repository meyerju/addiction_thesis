import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    patients: [],
    loading: false,
    purchased: false,
    patient: null,
    files:[]
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
    return updateObject( state, { patient: action.patient } );
};

const fetchFilesStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const fetchFilesSuccess = (state, action) => {
    return updateObject( state, { 
        error: null,
        loading: false,
        files: action.files
     } );
};

const fetchFilesFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_PATIENTS_START: return fetchPatientsStart( state, action );
        case actionTypes.FETCH_PATIENTS_SUCCESS: return fetchPatientsSuccess( state, action );
        case actionTypes.FETCH_PATIENTS_FAIL: return fetchPatientsFail( state, action );
        case actionTypes.CHOSE_PATIENT: return chosePatient( state, action );
        case actionTypes.FETCH_FILE_START: return fetchFilesStart(state, action);
        case actionTypes.FETCH_FILE_SUCCESS: return fetchFilesSuccess(state, action);
        case actionTypes.FETCH_FILE_FAIL: return fetchFilesFail(state, action);
        default: return state;
    }
};

export default reducer;