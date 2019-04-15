import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { URL_API } from '../environnement/environnement';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    console.log(error)
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        if (!isSignup) {
            signIn(authData, dispatch);
        } else {
            signUp(authData, dispatch);
        }
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('user').id;
                dispatch(authSuccess(token, userId));
            }
        }
    };
};

export const saltPassword = (salt, password) => {
    console.log("salt password ", password, salt);
    const salted = password + '{' + salt + '}';
    let digest = CryptoJS.SHA512(salted);

    for (let i = 1; i < 5000; i++) {
        digest = CryptoJS.SHA512(digest.concat(CryptoJS.enc.Utf8.parse(salted)));
    }

    const saltedPassword = CryptoJS.enc.Base64.stringify(digest);
    console.log("saltedPassword ", saltedPassword);

    return saltedPassword;
}

export const signUp = (authData, dispatch) => {
    axios.get(URL_API+"/initialize/" + authData.email).then(response => {
        if (response) {
            console.log("[STEP1]", response)
            const saltedPassword = saltPassword(response.data.salt, authData.password);
            authData.password = saltedPassword;
            authData.salt = response.data.salt;
            console.log("[STEP1]body", authData)
            axios.put(URL_API+'/therapists', authData)
                .then(response => {
                    console.log("[STEP2]", response)
                    localStorage.setItem('token', response.data.idToken);
                    dispatch(authSuccess(response.data.idToken, response.data.localId));
                })
                .catch(err => {
                    console.log("[STEP2]err", err)
                    dispatch(authFail("err"));
                });
        }
    }).catch(err => {
        console.log("[STEP1]err", err)
        dispatch(authFail("err"));
    });
}

export const signIn = (authData, dispatch) => {
    axios.get(URL_API+"/salt/" + authData.email).then(response => {
        console.log("salt", response)
        const getSalt = response.data.salt;
        authData.saltedPassword = saltPassword(getSalt, authData.password);
        delete authData.password;
        axios.post(URL_API+'/login', authData).then(data => {
            if (data) {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            } else {
                dispatch(authFail('Bad credentials'));
            }
        }).catch(err => {
            console.log("[STEP2]err", err)
            dispatch(authFail("err"));
        });
    }).catch(err => {
        console.log("[STEP1]err", err)
        dispatch(authFail("err"));
    });
}