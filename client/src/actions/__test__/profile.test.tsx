import React from "react";

import * as actionTypes from "../types";

import * as actions from "../index";

describe("PROFILE ACTIONS", () => {
    it("getCurrentProfile", () => {
        const expectedAction = {
            type: actionTypes.GET_PROFILE_SAGA
        };
        expect(actions.getCurrentProfile()).toEqual(expectedAction);
    });

    it("getProfileSuccess", () => {
        const expectedAction = {
            type: actionTypes.GET_PROFILE,
            payload: "test"
        };
        expect(actions.getProfileSuccess("test")).toEqual(expectedAction);
    });

    it("getProfileFail", () => {
        const expectedAction = {
            type: actionTypes.PROFILE_ERROR,
            payload: {
                msg: "test",
                status: "400"
            }
        };
        expect(actions.getProfileFail("test", "400")).toEqual(expectedAction);
    });

    it("updateProfile", () => {
        const expectedAction = {
            type: actionTypes.UPDATE_PROFILE_SAGA,
            formData: {
                name: "store1"
            }
        };
        expect(
            actions.updateProfile({
                name: "store1"
            })
        ).toEqual(expectedAction);
    });
});
