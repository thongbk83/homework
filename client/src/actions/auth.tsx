import * as actionTypes from "./types";

// Load User
export const loadUser = () => {
    return {
        type: actionTypes.LOADUSER_SAGA
    };
};

export const loadUserSuccess = (resData: any) => {
    return {
        type: actionTypes.USER_LOADED,
        payload: resData
    };
};

export const loadUserFail = () => {
    return {
        type: actionTypes.AUTH_ERROR
    };
};

//Register User
export const register = ({ name, email, password }: any) => {
    return {
        type: actionTypes.REGISTER_SAGA,
        name,
        email,
        password
    };
};

export const registerSuccess = (resData: any) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload: resData
    };
};

export const registerFail = () => {
    return {
        type: actionTypes.REGISTER_FAIL
    };
};

// Login User
export const login = (email: string, password: string) => {
    return {
        type: actionTypes.LOGIN_SAGA,
        email,
        password
    };
};

export const loginSuccess = (resData: any) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: resData
    };
};

export const loginFail = () => {
    return {
        type: actionTypes.LOGIN_FAIL
    };
};

// Logout / Clear Profile
export const logout = () => {
    return {
        type: actionTypes.LOGOUT_SAGA
    };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT
    };
};
