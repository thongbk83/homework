import React from "react";

import * as actionTypes from "../types";

import * as actions from "../index";

describe("AUTH ACTIONS", () => {
    it("should create an action loadUser with correct type", () => {
        const expectedAction = {
            type: actionTypes.LOADUSER_SAGA
        };
        expect(actions.loadUser()).toEqual(expectedAction);
    });

    it("should create an action loadUserSuccess with correct type", () => {
        const expectedAction = {
            type: actionTypes.USER_LOADED,
            payload: "test"
        };
        expect(actions.loadUserSuccess("test")).toEqual(expectedAction);
    });

    it("should create an action loadUserFail with correct type", () => {
        const expectedAction = {
            type: actionTypes.AUTH_ERROR
        };
        expect(actions.loadUserFail()).toEqual(expectedAction);
    });

    it("should create an action register with correct type", () => {
        const expectedAction = {
            type: actionTypes.REGISTER_SAGA,
            name: "name",
            email: "email",
            password: "password"
        };
        expect(
            actions.register({
                name: "name",
                email: "email",
                password: "password"
            })
        ).toEqual(expectedAction);
    });

    it("should create an action registerSuccess with correct type", () => {
        const expectedAction = {
            type: actionTypes.REGISTER_SUCCESS,
            payload: "test"
        };
        expect(actions.registerSuccess("test")).toEqual(expectedAction);
    });

    it("registerFail", () => {
        const expectedAction = {
            type: actionTypes.REGISTER_FAIL
        };
        expect(actions.registerFail()).toEqual(expectedAction);
    });

    it("should create an action Login with correct type", () => {
        const expectedAction = {
            type: actionTypes.LOGIN_SAGA,
            email: "email",
            password: "password"
        };
        expect(actions.login("email", "password")).toEqual(expectedAction);
    });

    it("loginSuccess", () => {
        const expectedAction = {
            type: actionTypes.LOGIN_SUCCESS,
            payload: "test"
        };
        expect(actions.loginSuccess("test")).toEqual(expectedAction);
    });

    it("loginFail", () => {
        const expectedAction = {
            type: actionTypes.LOGIN_FAIL
        };
        expect(actions.loginFail()).toEqual(expectedAction);
    });

    it("logout", () => {
        const expectedAction = {
            type: actionTypes.LOGOUT_SAGA
        };
        expect(actions.logout()).toEqual(expectedAction);
    });

    it("logoutSuccess", () => {
        const expectedAction = {
            type: actionTypes.LOGOUT
        };
        expect(actions.logoutSuccess()).toEqual(expectedAction);
    });
});
