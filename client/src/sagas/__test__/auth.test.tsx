import { put } from "redux-saga/effects";

import mockAxios from "../__mocks__/axios";
import { logoutSaga, loginSaga, registerSaga } from "../auth";
import {
    logoutSuccess,
    loginSuccess,
    loadUser,
    registerSuccess
} from "../../actions";
import setAlert from "../../utils/setAlert";

describe("test auth saga", () => {
    beforeEach(() => {});

    it("logoutSaga", async done => {
        const action = { profileId: 1 };
        const gen = logoutSaga(action);

        expect(gen.next().value).toEqual(put(logoutSuccess()));
        done();
    });

    it("loginSaga  success", async done => {
        const mockData = {
            token: "sample token"
        };

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockData })
        );

        const action = { profileId: 1 };
        const gen = loginSaga(action);
        gen.next();
        expect(gen.next({ data: mockData }).value).toEqual(
            put(loginSuccess(mockData))
        );
        expect(gen.next().value).toEqual(put(loadUser()));
        done();
    });

    it("registerSaga  success", async done => {
        const mockData = {
            token: "sample token"
        };

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockData })
        );

        const action = { profileId: 1 };
        const gen = registerSaga(action);
        gen.next();
        expect(gen.next({ data: mockData }).value).toEqual(
            put(registerSuccess(mockData))
        );
        done();
    });
});
