import authReducers from "../auth";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "../../actions/types";

describe("AUTH REDUCER", () => {
    it("handle actions of type default", () => {
        const exptectedState = {
            token: null,
            isAuthenticated: null,
            loading: true,
            user: null
        };

        const newState = authReducers(undefined, {});
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type LOGIN_SUCCESS", () => {
        const action = {
            type: LOGIN_SUCCESS,
            payload: { token: "sample token" }
        };

        const exptectedState = {
            isAuthenticated: true,
            loading: false,
            token: "sample token"
        };

        const newState = authReducers([], action);
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type REGISTER_SUCCESS", () => {
        const action = {
            type: REGISTER_SUCCESS,
            payload: { token: "sample token" }
        };

        const exptectedState = {
            isAuthenticated: true,
            loading: false,
            token: "sample token"
        };

        const newState = authReducers([], action);
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type LOGIN_FAIL", () => {
        const action = {
            type: LOGIN_FAIL
        };

        const exptectedState = {
            isAuthenticated: false,
            loading: false,
            token: null
        };

        const newState = authReducers([], action);
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type USER_LOADED", () => {
        const action = {
            type: USER_LOADED,
            payload: { id: "1" }
        };

        const exptectedState = {
            isAuthenticated: true,
            loading: false,
            user: { id: "1" }
        };

        const newState = authReducers([], action);
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type REGISTER_FAIL", () => {
        const action = {
            type: REGISTER_FAIL
        };

        const exptectedState = {
            isAuthenticated: false,
            loading: false,
            token: null
        };

        const newState = authReducers([], action);
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type AUTH_ERROR", () => {
        const action = {
            type: AUTH_ERROR
        };

        const exptectedState = {
            isAuthenticated: false,
            loading: false,
            token: null
        };

        const newState = authReducers([], action);
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type AUTH_ERROR", () => {
        const action = {
            type: LOGOUT
        };

        const exptectedState = {
            isAuthenticated: false,
            loading: false,
            token: null
        };

        const newState = authReducers([], action);
        expect(newState).toEqual(exptectedState);
    });
});
