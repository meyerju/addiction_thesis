import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    loading: false,
};

const loadStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const loadSuccess = (state, action) => {
    return updateObject( state, { 
        error: null,
        loading: false
     } );
};

const loadFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOAD_START: return loadStart(state, action);
        case actionTypes.LOAD_SUCCESS: return loadSuccess(state, action);
        case actionTypes.LOAD_FAIL: return loadFail(state, action);
        default:
            return state;
    }
};

export default reducer;