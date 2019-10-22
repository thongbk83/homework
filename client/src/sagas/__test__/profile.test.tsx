import { put } from "redux-saga/effects";

import mockAxios from "../__mocks__/axios";
import { getCurrentProfileSaga, updateProfileSaga } from "../profile";
import { getProfileSuccess, getProfileFail } from "../../actions";
import setAlert from "../../utils/setAlert";

describe("test profile saga", () => {
    beforeEach(() => {});

    it("getCurrentProfile  success", async done => {
        const mockData = {
            id: 1,
            name: "company"
        };

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockData })
        );

        const action = { profileId: 1 };
        const gen = getCurrentProfileSaga(action);
        gen.next();
        expect(gen.next({ data: mockData }).value).toEqual(
            put(getProfileSuccess(mockData))
        );
        done();
    });

    it("getCurrentProfile  fail", async done => {
        const error = {
            response: {
                status: "400",
                statusText: "error",
                data: {
                    errors: ["test"]
                }
            }
        };

        const action = { profileId: 1 };
        const gen = getCurrentProfileSaga(action);
        gen.next();
        expect(gen.throw(error).value).toEqual(
            put(getProfileFail("error", "400"))
        );
        done();
    });

    it("update profile  success", async done => {
        const mockData = {
            id: 1,
            name: "company"
        };

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockData })
        );

        const action = { profileId: 1 };
        const gen = updateProfileSaga(action);
        gen.next();
        expect(gen.next({ data: mockData }).value).toEqual(
            put(getProfileSuccess(mockData))
        );
        expect(gen.next().value).toEqual(
            setAlert("Profile Updated", "success")
        );
        done();
    });
});
