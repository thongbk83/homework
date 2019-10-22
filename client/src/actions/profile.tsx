import * as actionTypes from "./types";

// Get current users profile
export const getCurrentProfile = () => {
    return {
        type: actionTypes.GET_PROFILE_SAGA
    };
};

export const getProfileSuccess = (resData: any) => {
    return {
        type: actionTypes.GET_PROFILE,
        payload: resData
    };
};

export const getProfileFail = (msg: string, status: string) => {
    return {
        type: actionTypes.PROFILE_ERROR,
        payload: {
            msg: msg,
            status: status
        }
    };
};

// Create or update profile
export const updateProfile = (formData: any) => {
    return {
        type: actionTypes.UPDATE_PROFILE_SAGA,
        formData
    };
};

//upload image
export const uploadImage = (formData: any) => {
    return {
        type: actionTypes.UPLOADIMAGE_SAGA,
        formData
    };
};
