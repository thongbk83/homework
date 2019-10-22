import { put } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions";
import setAlert from "../utils/setAlert";

export function* getCurrentProfileSaga(action: any) {
    try {
        if (localStorage.getItem("token")) {
            yield (axios.defaults.headers.common[
                "x-auth-token"
            ] = localStorage.getItem("token"));
        }

        const response: any = yield axios.get("/api/profile/me");

        yield put(actions.getProfileSuccess(response.data));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => setAlert(error.msg, "error"));
        }

        yield put(
            actions.getProfileFail(err.response.statusText, err.response.status)
        );
    }
}

export function* updateProfileSaga(action: any) {
    try {
        if (localStorage.getItem("token")) {
            yield (axios.defaults.headers.common[
                "x-auth-token"
            ] = localStorage.getItem("token"));
        }

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response: any = yield axios.post(
            "/api/profile",
            action.formData,
            config
        );

        yield put(actions.getProfileSuccess(response.data));
        yield setAlert("Profile Updated", "success");
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => setAlert(error.msg, "error"));
        }

        yield put(
            actions.getProfileFail(err.response.statusText, err.response.status)
        );
    }
}
