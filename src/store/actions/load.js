import * as actionTypes from './actionTypes';
import axios from '../../axios-patients';
import { URL_API } from '../environnement/environnement';

export const loadSuccess = () => {
    return {
        type: actionTypes.LOAD_SUCCESS,
    };
};

export const loadFail = (error) => {
    return {
        type: actionTypes.LOAD_FAIL,
        error: error
    };
};

export const loadStart = () => {
    return {
        type: actionTypes.LOAD_START
    };
};

export const load = (file, patientId) => {
    let error = null;
    return dispatch => {
        dispatch(loadStart());
        axios.post(URL_API + "/file/load", file)
            .catch(err => {
                error = err;
                dispatch(loadFail(err));
            })
            .then(res => {
                if (!error) {
                    console.log("[LOAD] success, ", res)
                    dispatch(loadSuccess());
                    dispatch(fetchFiles(patientId));
                }
            });
    };
};

export const deleteSuccess = () => {
    return {
        type: actionTypes.DELETE_FILE_SUCCESS,
    };
};

export const deleteFile = (fileId,patientId) => {
    console.log(fileId)
    let error = null;
    return dispatch => {
        dispatch(loadStart());
        axios.delete(URL_API + "/files/"+fileId)
            .catch(err => {
                error = err;
                dispatch(loadFail(err));
            })
            .then(res => {
                if (!error) {
                    console.log("[LOAD] success, ", res)
                    dispatch(deleteSuccess());
                    dispatch(fetchFiles(patientId));
                }
            });
    };
};

export const loadDataSuccess = () => {
    return {
        type: actionTypes.LOAD_FILE_DATA_SUCCESS,
    };
};

export const loadData = (fileId,patientId) => {
    console.log(fileId)
    let error = null;
    return dispatch => {
        dispatch(loadStart());
        axios.get(URL_API + "/file/"+fileId)
            .catch(err => {
                error = err;
                dispatch(loadFail(err));
            })
            .then(res => {
                if (!error) {
                    console.log("[LOAD] success, ", res)
                    dispatch(loadDataSuccess());
                    dispatch(fetchFiles(patientId));
                }
            });
    };
};

export const fetchFilesSuccess = (files) => {
    return {
        type: actionTypes.FETCH_FILE_SUCCESS,
        files:files
    };
};

export const fetchFilesFail = (error) => {
    return {
        type: actionTypes.FETCH_FILE_FAIL,
        error: error
    };
};

export const fetchFilesStart = () => {
    return {
        type: actionTypes.FETCH_FILE_START
    };
};

export const fetchFiles = (patientId) => {
    let error = null;
    return dispatch => {
        dispatch(fetchFilesStart());
        axios.get(URL_API + "/files/" + patientId)
            .catch(err => {
                error = err;
                dispatch(fetchFilesFail(err));
            })
            .then(res => {
                if (!error) {
                    console.log("[FETCHFILE] success, ", res)
                    dispatch(fetchFilesSuccess(res.data));
                }
            });
    };
};