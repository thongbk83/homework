import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ auth: { isAuthenticated, loading }, ...rest }: any) => {
    if (!isAuthenticated && !loading) {
        return <Redirect to="/login"></Redirect>;
    } else {
        return <Route {...rest}></Route>;
    }
};

PrivateRoute.propTypes = {};

const mapStateToProps = (state: any) => {
    return {
        auth: state.auth
    };
};
export default connect(mapStateToProps)(PrivateRoute);
