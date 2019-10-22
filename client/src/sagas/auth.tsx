import { put } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions";
import setAlert from "../utils/setAlert";

export function* logoutSaga(action: any) {
    yield put(actions.logoutSuccess());
}

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

export function* loginSaga(action: any) {
    const body = JSON.stringify({
        email: action.email,
        password: action.password
    });

    try {
        const response: any = yield axios.post("/api/auth", body, config);
        yield put(actions.loginSuccess(response.data));

        yield put(actions.loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => setAlert(error.msg, "error"));
        }
        yield put(actions.loginFail());
    }
}

export function* registerSaga(action: any) {
    const body = JSON.stringify({
        name: action.name,
        email: action.email,
        password: action.password
    });

    try {
        const response: any = yield axios.post("/api/users", body, config);
        yield put(actions.registerSuccess(response.data));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => setAlert(error.msg, "error"));
        }

        yield put(actions.registerFail());
    }
}

export function* loadUserSaga(action: any) {
    if (localStorage.token) {
        yield (axios.defaults.headers.common["x-auth-token"] =
            localStorage.token);
    }

    try {
        const response: any = yield axios.get("/api/auth");

        yield put(actions.loadUserSuccess(response.data));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => setAlert(error.msg, "error"));
        }

        yield put(actions.loadUserFail());
    }
}
