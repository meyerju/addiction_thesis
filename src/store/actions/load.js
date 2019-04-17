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

export const load = (file) => {
    return dispatch => {
        dispatch(loadStart());
        axios.post(URL_API+"/file/load", file)
            .then(res => {
               console.log("[LOAD] success, ",res)
                dispatch(loadSuccess());
            })
            .catch(err => {
                dispatch(loadFail(err));
            });
    };
};