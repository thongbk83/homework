import { takeEvery } from "redux-saga/effects";
import * as actionType from "../actions/types";

import { logoutSaga, loginSaga, registerSaga, loadUserSaga } from "./auth";
import { getCurrentProfileSaga, updateProfileSaga } from "./profile";

export function* watchAuth() {
    //auth
    yield takeEvery(actionType.LOGOUT_SAGA, logoutSaga);
    yield takeEvery(actionType.LOGIN_SAGA, loginSaga);
    yield takeEvery(actionType.REGISTER_SAGA, registerSaga);
    yield takeEvery(actionType.LOADUSER_SAGA, loadUserSaga);

    //profile
    yield takeEvery(actionType.GET_PROFILE_SAGA, getCurrentProfileSaga);
    yield takeEvery(actionType.UPDATE_PROFILE_SAGA, updateProfileSaga);
}
