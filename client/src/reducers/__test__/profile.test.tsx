import profileReducer from "../profile";
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from "../../actions/types";

describe("PROFILE REDUCER", () => {
    it("handle actions of type default", () => {
        const exptectedState = {
            profile: null,
            loading: true,
            error: {}
        };

        const newState = profileReducer(undefined, {});
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type GET_PROFILE", () => {
        const action = {
            type: GET_PROFILE,
            payload: { id: 1 }
        };

        const exptectedState = {
            profile: { id: 1 },
            error: {},
            loading: false
        };

        const newState = profileReducer(undefined, action);
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type UPDATE_PROFILE", () => {
        const action = {
            type: UPDATE_PROFILE,
            payload: { id: 1, name: "abc" }
        };

        const exptectedState = {
            profile: { id: 1, name: "abc" },
            error: {},
            loading: false
        };

        const newState = profileReducer(undefined, action);
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type PROFILE_ERROR", () => {
        const action = {
            type: PROFILE_ERROR,
            payload: { msg: "error" }
        };

        const exptectedState = {
            profile: null,
            error: { msg: "error" },
            loading: false
        };

        const newState = profileReducer(undefined, action);
        expect(newState).toEqual(exptectedState);
    });
});
